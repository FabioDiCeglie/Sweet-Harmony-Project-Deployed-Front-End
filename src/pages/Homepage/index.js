import logo from "./logo.png";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import("./style.css");

export default function Homepage() {
  return (
    <div className="Homepage">
      <div className="HomepageBlock">
        <div
          style={{
            backgroundImage: `url(${logo})`,
            width: 1100,
            height: 630,
            borderRadius: 20,
            alignSelf: "center",
          }}
        >
          <div className="HomepageCard">
            <p>
              Enjoy a customized culinary experience with a Private Chef in the
              comfort of your own home.
            </p>
            <Link to="/chefs">
              <Button
                variant="contained"
                className="ButtonCheckHere"
                style={{ backgroundColor: "green" }}
              >
                Check Here
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
