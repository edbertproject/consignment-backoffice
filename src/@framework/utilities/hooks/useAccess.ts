import { useAppSelector } from '../../../stores/hooks';

const useAccess = () => {
  const system = useAppSelector((state) => state.system)
  const acl = system.account.permission || []

  return acl;
};

export default useAccess;
