import { useAppSelector } from '$redux';

const useError = (key: string) => {
  const error = useAppSelector(state => state.Error[key]);
  return error;
};

export default useError;
