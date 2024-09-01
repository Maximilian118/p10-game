import React from "react"
import './_teamCard.scss';
import { teamType } from "../../../shared/types";
import Icon from "../../utility/icon/Icon";
import { IconButton } from "@mui/material";
import { Edit, Remove } from "@mui/icons-material";

interface teamCardType {
  team: teamType
  onClick?: (team: teamType) => void
  canEdit?: boolean
  onRemove?: (team: teamType) => void
  canRemove?: boolean
}

const TeamCard: React.FC<teamCardType> = ({ team, onClick, canEdit, onRemove, canRemove }) => (
  <div className="team-card" onClick={() => onClick && onClick(team)}>
    <Icon src={team.url} style={{ marginRight: 16 }}/>
    <p>{team.name}</p>
    <div className="toolbar">
      {canEdit && (
        <IconButton className="button edit">
          <Edit/>
        </IconButton>
      )}
      {canRemove && (
        <IconButton
          className="button remove"
          onClick={(e) => {
            e.stopPropagation()
            onRemove && onRemove(team)
          }}
        >
          <Remove/>
        </IconButton>
      )}
    </div>
  </div>
)

export default TeamCard
