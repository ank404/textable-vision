
import { useState } from 'react';
import axios from 'axios';
import { OcrResponse, DocumentFile, UploadState } from '../types';
import { toast } from '@/components/ui/sonner';

const API_ENDPOINT = '/upload';

export function useOcrProcessor() {
  const [state, setState] = useState<UploadState>({
    isLoading: false,
    error: null,
    data: null,
    file: null,
  });

  const processFile = async (file: DocumentFile) => {
    setState({
      isLoading: true,
      error: null,
      data: null,
      file,
    });

    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await axios.post<OcrResponse>(API_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setState({
        isLoading: false,
        error: null,
        data: response.data,
        file,
      });

      toast.success('Document processed successfully');
      return response.data;
    } catch (error) {
      console.error('Error processing document:', error);
      
      const errorMessage = 
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Failed to process document. Please try again.';
      
      setState({
        isLoading: false,
        error: errorMessage,
        data: null,
        file,
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
    });
  };

  return {
    ...state,
    processFile,
    clearData,
  };
}
