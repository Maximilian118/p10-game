// A list of badge reward outcomes.
// There may be more outcomes than there are badges in the DB.
// Therefore, we must do it this way rather than just pulling awardedHow and awardedDesc from all of the badges in the DB.
// If people create enough badges down the line to populate all of the below then we'll just pull from the DB.
export const badgeRewardOutcomes: { awardedHow: string; awardedDesc: string }[] = [
  {
    awardedHow: "Adj removed a competitior.",
    awardedDesc: "As an adjudicator you removed someone from a championship. Oh damn...",
  },
  {
    awardedHow: "Adjudicator deducted points.",
    awardedDesc:
      "As an adjudicator you have deducted points from someone. Someone's got to do the diry work.",
  },
  {
    awardedHow: "Be Adjudicator.",
    awardedDesc: "Be promoted to Adjudicator.",
  },
  {
    awardedHow: "Be demoted from competitor.",
    awardedDesc: "Be demoted from competitor status in a championship.",
  },
  {
    awardedHow: "Be last in a round.",
    awardedDesc: "Be last in a round. Bad luck.",
  },
  {
    awardedHow: "Be promoted to competitor.",
    awardedDesc: "Be promoted from guest to competitor of a championship.",
  },
  {
    awardedHow: "Be runner up 3 times.",
    awardedDesc: "Get runner up three times in a season. You'll get there one day.",
  },
  {
    awardedHow: "Bet on driver Q1 finish.",
    awardedDesc: "You bet on a driver that didn't leave Q1. How embarrassing.",
  },
  {
    awardedHow: "Bet on Podium Finish.",
    awardedDesc: "Bet on a driver that lands on the podium. You muppet.",
  },
  {
    awardedHow: "Champ finish no points.",
    awardedDesc: "Finish a championship with no points at all. Never mind. Cake?",
  },
  {
    awardedHow: "Champ Finish top 3.",
    awardedDesc: "Finish in the top three of a championship! Congratulations!",
  },
  {
    awardedHow: "Championship Win!",
    awardedDesc: "Win a championship! Congratulations! Here's a big cock to celibrate!",
  },
  {
    awardedHow: "Compete in every round.",
    awardedDesc: "Compete in every round in a championship.",
  },
  {
    awardedHow: "Deducted Points Adjudicator.",
    awardedDesc: "An adjudicator deducted points from you. Naughty Naughty!",
  },
  {
    awardedHow: "Did Not Finish. (DNF)",
    awardedDesc: "Bet on a driver that DNF'd. Are you high?!",
  },
  {
    awardedHow: "Did not start. (DNS)",
    awardedDesc: "Bet on a driver that did not start.",
  },
  {
    awardedHow: "Different bet 6 rounds.",
    awardedDesc: "Bet on a different driver every round for 6 rounds.",
  },
  {
    awardedHow: "Driver No Points Win.",
    awardedDesc: "After half way through a season, win with a driver that hasn't scored a point.",
  },
  {
    awardedHow: "Even points streak 4.",
    awardedDesc: "Have an even number of points for the past four races.",
  },
  {
    awardedHow: "First champ round win.",
    awardedDesc: "Win the first round of a championship.",
  },
  {
    awardedHow: "First Win ever.",
    awardedDesc: "Win your first ever round.",
  },
  {
    awardedHow: "Have same points as 2 others.",
    awardedDesc:
      "When you have more than ten points, have the same mount of points as two other competitiors.",
  },
  {
    awardedHow: "Have same points as 3 others.",
    awardedDesc:
      "When you have more than 2 points, have the same mount of points as three other competitiors.",
  },
  {
    awardedHow: "Jakob win and top 5.",
    awardedDesc: "Score within the top 5 in a round that Jakob won.",
  },
  {
    awardedHow: "Joined championship.",
    awardedDesc: "Join a championship.",
  },
  {
    awardedHow: "Last 3 with no points.",
    awardedDesc: "Be one of the last three people with no points.",
  },
  {
    awardedHow: "Last at Champ finish.",
    awardedDesc: "Be last when a championship ends. This should never happen.",
  },
  {
    awardedHow: "Lose to Max 8 times.",
    awardedDesc: "Max has beaten you 8 times in a row.",
  },
  {
    awardedHow: "Lose with a Ferrari.",
    awardedDesc: "Bet on a Ferrari and don't score any points. Mamma mia!",
  },
  {
    awardedHow: "Lose with a Mercedes.",
    awardedDesc:
      "Bet on a Mercedes driver and don't score any points. You should have listened to Jorge.",
  },
  {
    awardedHow: "No Points after 10 rounds.",
    awardedDesc: "You have no points after 10 rounds. Get your shit together.",
  },
  {
    awardedHow: "No points round closest.",
    awardedDesc: "Place the closest bet when nobody wins any points.",
  },
  {
    awardedHow: "No Points Round.",
    awardedDesc: "Score no points in a round.",
  },
  {
    awardedHow: "No points when Dale won.",
    awardedDesc: "Win no points when anyone named Dale has won.",
  },
  {
    awardedHow: "No vote for 1 round.",
    awardedDesc: "You decided not to vote for a round.. You must be too cool for this game.",
  },
  {
    awardedHow: "No vote for 3 rounds.",
    awardedDesc: "You did not vote for three rounds... Zav is not best pleased.",
  },
  {
    awardedHow: "No vote for 7 rounds.",
    awardedDesc: "You decided not to vote 7 times in a row. Why are you even here?",
  },
  {
    awardedHow: "Nobody knows...",
    awardedDesc: "You won Claw Zav! Why? Nobody knows...",
  },
  {
    awardedHow: "Nobody won a round.",
    awardedDesc: "Nobody won a round in your championship!",
  },
  {
    awardedHow: "Oldest driver win.",
    awardedDesc: "Win with the oldest driver on the grid.",
  },
  {
    awardedHow: "Point Lead 6.",
    awardedDesc: "Be 6 points ahead of anyone else.",
  },
  {
    awardedHow: "Point scored every round.",
    awardedDesc: "Score a point every round in the championship. Points nom nom.",
  },
  {
    awardedHow: "Points 20 when max points 2.",
    awardedDesc: "Score over 20 points when the maximum points you can win per round is 2.",
  },
  {
    awardedHow: "Points in a row 2.",
    awardedDesc: "Score points on the same driver twice in a row.",
  },
  {
    awardedHow: "Points streak 10.",
    awardedDesc: "Win a point every round for 10 rounds.",
  },
  {
    awardedHow: "Points streak 6.",
    awardedDesc: "Win a point every round for 6 rounds.",
  },
  {
    awardedHow: "Q length shorter than 2:15h.",
    awardedDesc:
      "Score points in a qualifying round that lasted no more than an hour and a quater.",
  },
  {
    awardedHow: "Runner up with a Ferrari.",
    awardedDesc: "Win runner up with a Ferrari driver.",
  },
  {
    awardedHow: "Same bet twice no points.",
    awardedDesc: "Bet on the same driver twice in a row and both times scored no points.",
  },
  {
    awardedHow: "Tallest driver win.",
    awardedDesc: "Win with the tallest driver on the grid.",
  },
  {
    awardedHow: "Two Championship Win streak!",
    awardedDesc: "Win two championships in a row. (╯°□°)╯︵ ┻━┻ You magnificent being!",
  },
  {
    awardedHow: "Wet Runner Up.",
    awardedDesc: "Come runner up in a wet round.",
  },
  {
    awardedHow: "Wet Win.",
    awardedDesc: "Win a wet round.",
  },
  {
    awardedHow: "Win 10 dry rounds.",
    awardedDesc: "Win 10 dry rounds.",
  },
  {
    awardedHow: "Win 12 rounds in a champ.",
    awardedDesc: "Win twelve rounds in a championship. 'OH Lavly'",
  },
  {
    awardedHow: "Win 2 times in a row.",
    awardedDesc: "Win points two times in a row.",
  },
  {
    awardedHow: "Win 3 times in a row.",
    awardedDesc: "Win points three times in a row.",
  },
  {
    awardedHow: "Win 5 times in a row.",
    awardedDesc: "Win points five times in a row. Stop it you thug!",
  },
  {
    awardedHow: "Win 6 rounds in a champ.",
    awardedDesc: "Win 6 rounds in a championship.",
  },
  {
    awardedHow: "Win After 3 week break.",
    awardedDesc: "Win the first race after a 3 week break.",
  },
  {
    awardedHow: "Win after Christmas.",
    awardedDesc: "Win the first round after Christmas.",
  },
  {
    awardedHow: "Win after Independence Day.",
    awardedDesc: "Win the first round after Korea's Independence Movement Day.",
  },
  {
    awardedHow: "Win after Jurr Park release.",
    awardedDesc:
      "Win the first round after June the 11th, the date that Jurrasic Park first aired.",
  },
  {
    awardedHow: "Win after no bet last round.",
    awardedDesc: "Win a round after not betting the previous round.",
  },
  {
    awardedHow: "Win after no points 12 rounds.",
    awardedDesc:
      "Score a point after scoring no points for the past twelve rounds. I knew you'd find some!",
  },
  {
    awardedHow: "Win after no points 6 rounds.",
    awardedDesc: "Win a round after scoring no points for 6 rounds.",
  },
  {
    awardedHow: "Win after Nowruz Fest.",
    awardedDesc: "Win the first round after Baku's Nowruz Festival.",
  },
  {
    awardedHow: "Win after StarTrek aired.",
    awardedDesc:
      "Win the first round after September the 8th, the date that Star Trek first aired.",
  },
  {
    awardedHow: "Win after the Grand National.",
    awardedDesc: "Be runner up in the first round after the Grand National.",
  },
  {
    awardedHow: "Win first of Tripple Header.",
    awardedDesc: "Win the last round of a tripple header.",
  },
  {
    awardedHow: "Win heaviest driver.",
    awardedDesc: "Win with the heaviest driver on the grid.",
  },
  {
    awardedHow: "Win last round of champ.",
    awardedDesc: "Win the last round of a championship.",
  },
  {
    awardedHow: "Win Single Header.",
    awardedDesc: "Win a single header event.",
  },
  {
    awardedHow: "Win then no win 5.",
    awardedDesc: "Win no points for 5 rounds after winning a round.",
  },
  {
    awardedHow: "Win when Aston Martin P1.",
    awardedDesc: "Win when an Aston Martin has placed P1",
  },
  {
    awardedHow: "Win when NOR P1.",
    awardedDesc: "Win when a driver with Norris in his name has placed P1",
  },
  {
    awardedHow: "Win when RIC in Q3.",
    awardedDesc: "Win when Daniel Ricciardo finishes in Q3.",
  },
  {
    awardedHow: "Win when Thomas last.",
    awardedDesc: "Win a round when Thomas came last.",
  },
  {
    awardedHow: "Win when VER P1",
    awardedDesc: "Win when VER has placed P1.",
  },
  {
    awardedHow: "Win with 10 players.",
    awardedDesc: "Win a round when 10 or more competitors have placed a bet.",
  },
  {
    awardedHow: "Win with a McLaren.",
    awardedDesc: "Win with a McLaren driver.",
  },
  {
    awardedHow: "Win with a Mexican driver.",
    awardedDesc: "Win with a Mexican driver.",
  },
  {
    awardedHow: "Win with Alpine.",
    awardedDesc: "Win with an Alpine driver.",
  },
  {
    awardedHow: "Win with an Aston Martin.",
    awardedDesc: "Win with an Aston Martin driver.",
  },
  {
    awardedHow: "Win with Aston Podium.",
    awardedDesc: "Win a round with an Aston Martin podium",
  },
  {
    awardedHow: "Win with Moustache driver.",
    awardedDesc: "Win a round with a driver that has a moustache. Good job old sport!",
  },
  {
    awardedHow: "Win with RBR dobule podium.",
    awardedDesc: "Win when both Red Bull drivers finish on the podium.",
  },
  {
    awardedHow: "Win with RBR not in Q3.",
    awardedDesc: "Win when both Red Bull drivers missed Q3!",
  },
  {
    awardedHow: "Win with team mate P9.",
    awardedDesc: "Win with a driver when their team mate finished in p9.",
  },
]

// Executed on round finish.
// Passed will be the championship ID, the user that's being checked, then an array of badges that belong to the championship.
// The user will be checked by a function for each possible badge reward outcome.
// If the function rewards the user, make a request to add the user._id to the awardedTo array of the badge and badges array of the user.
export const badgeLogic = () => {}
