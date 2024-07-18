type UseTimers = {
  getSecondsInMinutesLabel: (seconds: number) => string;
};

function useTimers(): UseTimers {
  const secondsInOneMinute = 60;
  const { t } = useI18n();

  function getSecondsInMinutesLabel(seconds: number): string {
    const minutes = Math.floor(seconds / secondsInOneMinute);
    const remainingSeconds = seconds % secondsInOneMinute;
    const minutesLabel = t("shared.time.minute", { count: minutes }, minutes);
    const secondsLabel = t("shared.time.second", { count: remainingSeconds }, remainingSeconds);

    if (minutes === 0) {
      return secondsLabel;
    }
    if (remainingSeconds === 0) {
      return minutesLabel;
    }
    return `${minutesLabel} ${t("shared.and")} ${secondsLabel}`;
  }
  return { getSecondsInMinutesLabel };
}

export { useTimers };