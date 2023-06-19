import { useNavigate } from "react-router";

const AddReview = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>AddReview</p>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};

export default AddReview;
