//Material UI
import Button from "@mui/material/Button";
import("./style.css");
export default function SignUpPage() {
  return (
    <div className="SignUpPageBlock">
      <div>
        <h1>Who you want to become? </h1>
      </div>
      <div className="SignUpPageButtons">
        <div>
          <Button variant="contained" href="/signup">
            Apply as a Chef
          </Button>
        </div>
        <div>
          <Button variant="contained" href="/signup/user">
            Sign Up as a User
          </Button>
        </div>
      </div>
    </div>
  );
}
