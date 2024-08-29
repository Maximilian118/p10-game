import React from "react"
import './_teamCard.scss';
import { teamType } from "../../../shared/types";
import Icon from "../../utility/icon/Icon";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

interface teamCardType {
  team: teamType
  onClick?: (team: teamType) => void
  canEdit?: boolean
}

const TeamCard: React.FC<teamCardType> = ({ team, onClick, canEdit }) => (
  <div className="team-card" onClick={() => onClick && onClick(team)}>
    <Icon src={team.url} style={{ marginRight: 16 }}/>
    <p>{team.name}</p>
    {canEdit && (
      <IconButton className="edit-button">
        <Edit/>
      </IconButton>
    )}
  </div>
)

export default TeamCard
