// loading message or error message
export default function DataStatus({ loading, error, onRetry }) {
  if (loading) {
    return <p className="message" role="status">Loading courses...</p>;
  }
  if (error) {
    return (
      <div className="error-box" role="alert">
        <p><strong>Oops!</strong> {error}</p>
        <button type="button" className="btn" onClick={onRetry}>Try again</button>
      </div>
    );
  }
  return null;
}
