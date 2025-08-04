const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

function formatRuntime(seconds) {
  const hours = Math.floor(seconds / 60);
  const minutes = seconds % 60;
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
}

export { formatDate, formatRuntime };
