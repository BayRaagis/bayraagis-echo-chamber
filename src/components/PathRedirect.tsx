import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PathRedirect = () => {
  const { path } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (path) {
      // Convert ?/path to /path and replace the URL
      navigate(`/${path}`, { replace: true });
    }
  }, [path, navigate]);
  
  return null; // Component doesn't render anything
};

export default PathRedirect;
