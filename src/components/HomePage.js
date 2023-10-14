const HomePage = () => {

  return (
    <div>
      <h1>Redmond STEM</h1>
      <div id="intro_paragraphs">
        {/* first two paragraphs which intro what the org is about */}
        <p>We are an organization of students comitted to teaching kids of all ages, (primarily grades 5-8)
          the fundamentals of science, technology, engineering, and mathematics. Over 4-8 weeks,
          students gain a beginner to intermediate level of knowledge on each topic.</p>
        <p>At Redmond STEM, we make learning fun for all ages, while still provinding a good introduction to our students on
          a topic, so they remain interested for years to come, and can even carry their knowledge into a higher education.
          Focusing primarily on grades 5-8, learning should be fun and interesting for the student, and our curriculum does
          just that, ensuring the child continues to enjoy the subject even after the course has ended.
        </p>
      </div>
      <div id="inspirational_quote" >
        <h4>
          "The roots of education are bitter, but the fruit is sweet." <h4 id="aristotle">-Aristotle</h4>
        </h4>
      </div>
      <div id="courses_offered">
        <h4 id="courses_title">
          Courses Offered
        </h4>
        <ul>
          <li>INTRO TO ALGEBRA</li>
          <li>INTRO TO GEOMETRY</li>
          <li>INTRO TO COMPUTER SCIENCE</li>
          <li>AMC8 SUPPLEMENT</li>
          <li>SCIENCE OLYMPIAD SUPPPLEMENT</li>
          <li>INTRO TO BIOLOGY</li>
          <li>INTRO TO ALGEBRA 2</li>
        </ul>
        <img></img>
      </div>
    </div>
  );

}

export default HomePage;