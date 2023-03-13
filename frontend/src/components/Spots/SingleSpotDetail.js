
const SingleSpotDetail = ({ singleSpot }) => {

if (!singleSpot) return null;


  return (

        <div className="description-container">
          <h2>
            Hosted by {singleSpot.Owner?.firstName} {singleSpot.Owner?.lastName}
          </h2>

          <p>
            {singleSpot.description}. Considering how much unhappiness there is
            in the world today, there might be a temptation to dismiss this poem
            and its ilk as an optimistic delusion. There is a sad tendency to
            view the world as a wasteland rather than a wonderland. This is,
            perhaps, one of the deepest errors of our time, the error of
            cynicism. What the world needs, what people need, what Catholics
            need, is a psychological and spiritual renewal: a renewal of
            politics, culture, parenthood, education… and poetry. There is an
            old proverb that says if a person does not learn poetry as a child,
            they will not know how to pray as an adult. A more arresting thing
            could hardly be said, especially in an age where poetry is dead,
            either shrugged off with indifference or dismissed as unimportant.
            Without doubt, the Church and the world need scientists and soldiers
            in the cultural and spiritual war zones to defend the Faith. But, in
            as much as civilization needs such professionals, so too does it
            need poets—and that for a very simple reason. Scientists without
            poetry can be slaves to systems. Soldiers without poetry can be
            barbarians devoid of chivalry. A people without poetry cannot be
            effective missionaries, because the charm of the Faith shines with
            poetry. Without poetry, without some knowledge or expression of
            Goodness, Truth, and Beauty, there is less hope of attaining the
            glorious end of martyrdom—whether through war, marriage, work, or
            any given Tuesday.
          </p>
        </div>
  );
};

export default SingleSpotDetail;
