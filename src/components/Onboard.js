import React from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';

export default function Onboard() {
  return (
    <Container>
      <br />
      <Row>
        <h4>Welcome to RockOn!</h4>
      </Row>
      <br />
      <Row>
        To get started, click the Log a Climb button above, where you can search for routes by name or by area. Once you've selected a route, add details about your ascent, including the date, style (unless you've been bouldering), outcome, and other relevant notes. As you log climbs, you'll see them appear in the logbook, where you can edit or delete them later.
      </Row>
      <br />
      <Jumbotron>
        Currently there is no support for adding a climb that is NOT listed on Mountain Project. I hope to add this feature in the future!
      </Jumbotron>
      <br />
      <Row>
        Once you have some entries logged, head back to to the dashboard to view your stats. You'll still see all your logged entries on the righthand side, but there will also be some graphs and filter options. The main graph displays all of your entries, plotted by date and grade. The trend lines for Trad, Boulder, and Sport show only entries that you have selected an outcome of 'Redpoint' for. The highest graded redpoint for each day is used to plot the line graph.
      </Row>
      <br />
      <Jumbotron>
        Currently climbs that have a main type other than Trad, Sport, or Boulder are not supported in the graphing or filtering options.
        </Jumbotron>
      <br />
      <Row>
        The bar graph on the lower left breaks down your climbs grouped by grades, type and outcome. Outcomes are grouped by "Send" outcomes (Redpoint, Flash, Onsight, Pinkpoint), "TR" outcomes (Tronsight, No Falls, TR attempt), "Repeat" and "Attempt". For boulder problems flashes are categorized seperately, and of course the TR category doesn't apply.
      </Row>
      <br />
      <Jumbotron>
        It's entirely up to you how to categorize the outcome of your climb, but your data will be displayed differently depending on what outcome you choose.
      </Jumbotron>
      <br />
      <Row>
        Clicking on a climb in the log entry sidebar or in the graph will show you details about that climb, including all the entries you've made for that climb. Here you can see your total number of ascents and attempts for that climb, and see all of your notes and beta consolidated in one place.
      </Row>
      <br />
      <Row>
        As you add entries, there will be more data for the charts to show your climbing trends over time. Play with different filter options to understand how the charts change, and see what you can learn about your climbing habits from your history.
      </Row>
      <br />
      <Row>
        Happy climbing!
      </Row>
      <br />
    </Container>
  )
}