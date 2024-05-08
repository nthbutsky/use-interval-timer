import {
  onMounted, onUnmounted,
} from 'vue';

interface IPayload {
  callback: () => void,
  interval?: number,
  repeat?: number,
}

export const useIntervalTimer = ({
  callback,
  interval,
  repeat = Infinity,
}: IPayload) => {
  let count = 0;

  const intervalTimer = setInterval(() => {
    callback();

    count += 1;
    if (count === repeat) {
      clearInterval(intervalTimer);
    }
  }, interval || 300000); // 5 minutes

  callback();

  onMounted(() => {
    callback();
  });

  onUnmounted(() => {
    clearInterval(intervalTimer);
  });
};
