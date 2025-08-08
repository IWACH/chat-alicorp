export const isMobileDevice = (): boolean => {
  const mobileUserAgent =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const smallScreen = window.innerWidth <= 768;

  return mobileUserAgent || smallScreen;
};
