export const useCloseModal = () => {
  const closeModal = (setNullFunc) => {
    setNullFunc(null);
  };

  return {
    closeModal,
  };
};
