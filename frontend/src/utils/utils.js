// Hàm format datetime
export function formatDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần +1
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export const formatTime = (time) => {
  // Format time in seconds to MM:SS
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const convertToPercentage = (value, min, max) => {
  let percent = ((value - min) / (max - min)) * 100;
  // map percent to range 0-100
  // percentage is 0 to 1 in the range
  // multiple by 100 to get percentage
  let val = Math.min(100, Math.max(0, percent));
  // round up
  return Math.round(val);
};
