
import { useState } from 'react';
import axios from 'axios';
import { OcrResponse, DocumentFile, UploadState } from '../types';
import { toast } from "sonner";

const API_ENDPOINT = 'https://ocr.anupkhanal.info.np/upload';

export function useOcrProcessor() {
  const [state, setState] = useState<UploadState>({
    isLoading: false,
    error: null,
    data: null,
    file: null,
    uploadProgress: 0
  });

  const processFile = async (file: DocumentFile) => {
    setState({
      isLoading: true,
      error: null,
      data: null,
      file,
      uploadProgress: 0
    });

    const formData = new FormData();
    formData.append('file', file); // Changed from 'document' to 'file' to match backend expectation

    try {
      console.log('Uploading file:', file.name, 'size:', file.size, 'type:', file.type);
      
      const response = await axios.post<OcrResponse>(API_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setState(prev => ({ ...prev, uploadProgress: percentCompleted }));
            console.log(`Upload progress: ${percentCompleted}%`);
          }
        }
      });

      console.log('API Response:', response.data);

      if (!response.data) {
        throw new Error('No data received from the server');
      }

      setState({
        isLoading: false,
        error: null,
        data: response.data,
        file,
        uploadProgress: 100
      });

      toast.success('Document processed successfully');
      return response.data;
    } catch (error) {
      console.error('Error processing document:', error);
      
      let errorMessage = 'Failed to process document. Please try again.';
      
      if (axios.isAxiosError(error)) {
        console.log('Axios error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
        
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.message) {
          errorMessage = `Request failed: ${error.message}`;
        }
      }
      
      setState({
        isLoading: false,
        error: errorMessage,
        data: null,
        file,
        uploadProgress: 0
      });
      
      toast.error(errorMessage);
      return null;
    }
  };

  const clearData = () => {
    setState({
      isLoading: false,
      error: null,
      data: null,
      file: null,
      uploadProgress: 0
    });
  };

  return {
    ...state,
    processFile,
    clearData,
  };
}
