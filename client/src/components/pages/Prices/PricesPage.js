import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Container, Progress } from "reactstrap";
import {
  getConcerts,
  getRequest,
  loadConcertsRequest,
} from "../../../redux/concertsRedux";

const Prices = () => {
  const dispatch = useDispatch();
  const concerts = useSelector(getConcerts);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadConcertsRequest());
  }, [dispatch]);

  const numbersToWords = {
    1: "one",
    2: "two",
    3: "three",
  };

  return (
    <Container>
      <h1>Prices</h1>
      <p>
        Prices may differ according the day of the festival. Remember that
        ticket includes not only the star performance, but also 10+ workshops.
        We gathered several genre teachers to help you increase your vocal
        skills, as well as self confidence.
      </p>

      <Alert color="info">
        Attention!{" "}
        <strong>
          Children under 4 can go freely with you without any other fee!
        </strong>
      </Alert>
      {concerts.length === 0 ? (
        request.pending ? (
          <Progress animated color="primary" value={50} />
        ) : (
          <Alert color="warning">{request.error}</Alert>
        )
      ) : (
        concerts.map((con) => {
          return (
            <div key={con._id}>
              <h2>Day {numbersToWords[con.day]}</h2>
              <p>Price: {con.price}$</p>
              <p>
                Workshops:{" "}
                {con.workshops.map((workshop) => {
                  return <span key={workshop._id}>"{workshop.name}", </span>;
                })}
              </p>
            </div>
          );
        })
      )}
    </Container>
  );
};

export default Prices;
