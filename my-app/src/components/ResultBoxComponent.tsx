import './ResultBoxComponent.css';

export interface ResultBoxProps {
  isError?: boolean;
  resultData: any;
}

const ResultBoxComponent: React.FC<ResultBoxProps> = (props) => {
  return (
    <>
      <div className={props.isError ? "error-box" : "response-box"}>
        <pre>{props.isError ? props.resultData : JSON.stringify(props.resultData, null, 2)}</pre>
      </div>
    </>
  );
};

export default ResultBoxComponent;