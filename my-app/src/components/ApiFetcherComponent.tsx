import { useState } from 'react';
import './ApiFetcherComponent.css';
import axios, { AxiosError } from 'axios';
import ResultBoxComponent, { type ResultBoxProps } from './ResultBoxComponent';

interface ApiFetcherProps {
  initialUrl?: string;
}

const ApiFetcherComponent: React.FC<ApiFetcherProps> = (props) => {
  const [url, setUrl] = useState<string>(props.initialUrl ?? 'https://');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ResultBoxProps>({
    isError: false,
    resultData: null
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        validateStatus: (status) => status >= 200 && status < 300,
      });
      setResult({
        isError: false,
        resultData: response.data
      });      
    }
    catch (error : unknown) {
      let errorMessage = 'Ошибка запроса';
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          errorMessage = `Статус: ${axiosError.response.status}, Данные: ${JSON.stringify(axiosError.response.data)}`;
        } else if (axiosError.request) {
          errorMessage = 'Нет ответа от сервера';
        } else {
          errorMessage = `Ошибка в конфигурации запроса: ${axiosError.message}`;
        }
      } else if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      } else {
        errorMessage = `Неожиданная ошибка: ${error}`;
      }
      setResult({
        isError: true,
        resultData: errorMessage
      });      

    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>API Fetcher</h1>
      <div className="api-fetcher-container">
        <div className="input-group">
          <label htmlFor="api-url" className="url-label">API url:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input"
            id="api-url"
          />
          <button
            type="button"
            onClick={fetchData}
            className="fetch-button"
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Запросить данные'}
          </button>
        </div>
        {result.resultData !== null && <ResultBoxComponent {...result} />}
      </div>
    </>
  );
};

export default ApiFetcherComponent;