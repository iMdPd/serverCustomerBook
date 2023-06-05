import Concert from "./../Concert/Concert";

const Concerts = ({ concerts, seats }) => (
  <section>
    {concerts.map((con) => (
      <Concert key={con._id} {...con} seats={seats} />
    ))}
  </section>
);

export default Concerts;
