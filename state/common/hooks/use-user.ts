export const useUser = () => {
  // todo aws congnito
  // getMe query here
  const authenticated = true;
  const loading = false;
  const stubbedRefetch = () => undefined;

  // TODO
  return {
    refetch: stubbedRefetch,
    loading: false,
    authenticated,
    user: {
      id: '1',
    },
  };
};
