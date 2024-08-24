import React from "react"
import './_teamCard.scss';
import { teamType } from "../../../shared/types";
import Icon from "../../utility/icon/Icon";

interface teamCardType {
  team: teamType
  onClick?: () => void
}

const TeamCard: React.FC<teamCardType> = ({ team, onClick }) => {
  return (
    <div className="team-card" onClick={onClick}>
      <Icon src={team.url} style={{ marginRight: 16 }}/>
      <p>{team.name}</p>
    </div>
  )
}

export default TeamCard
