import { userType } from "./localStorage"

export interface formType {
  icon: File | null
  profile_picture: File | null
  name?: string
  champName?: string
  email?: string
}

export interface formErrType {
  name?: string
  champName?: string
  dropzone: string
  [key: string]: string | undefined
}

export interface champType {
  _id: string
  name: string
  icon: string
  season: string
  nextRound: string
  adjudicator: {
    current: userType
    since: string
    rounds: string[]
    player: boolean
    history: {
      adjudicator: userType
      since: string
      rounds: string[]
    }[]
  }
  players: userType[]
  pointsStructure: {
    result: number
    points: number
  }[]
  points: {
    player: userType
    points: number
    history: {
      round: string
      points: number
    }[]
  }[]
  rulesAndRegs: {
    default: boolean
    list: {
      text: string
      createdBy: userType
      created_at: string
      histroy: {
        text: string
        updatedBy: userType
        updated_at: string
      }
      subsections: {
        text: string
        createdBy: userType
        created_at: string
        histroy: {
          text: string
          updatedBy: userType
          updated_at: string
        }
      }[]
    }[]
  }
  protests: protestType[] // Protest model
  ruleChanges: ruleChangeType[] // RuleChange model
  settings: {
    maxPlayers: number
    inactivePlayers: boolean
    protests: {
      protestsAlwaysVote: boolean
      allowMultipleProtests: boolean
    }
    ruleChanges: {
      ruleChangeAlwaysVote: boolean
      allowMultipleRuleChanges: boolean
      ruleChangeExpiry: string
    }
    autoOpen: {
      auto: boolean
      dateTime: string
    }
    autoClose: {
      auto: boolean
      dateTime: string
    }
    audio: {
      enabled: boolean
      auto: boolean
      triggers: {
        open: string[]
        close: string[]
      }
    }
    wager: {
      allow: boolean
      description: string
      max: number
      min: number
      equal: boolean
    }
  }
  champBadges: badgeType[] // Badge model
  waitingList: {
    user: userType
    position: number
  }[]
  history: {
    seasons: string[]
    names: {
      name: string
      created_at: string
    }[]
    rounds: {
      round: string
      created_at: string
    }[]
    stats: {
      allTime: {
        mostPlayers: number // Most players to be a part of the champ concurrently ever.
        mostPoints: {
          // Most points ever awarded to a player in a season.
          player: userType
          points: number
        }
        mostBadgesGiven: {
          player: userType // Most badges given to a player.
          badgesNum: number
        }
        rarestBadgeGiven: {
          player: userType // Rarest badge given to a player.
          badge: userType // What badge?
        }
        mostWins: {
          player: userType // Most wins ever.
          amount: number
        }
        mostRunnerUp: {
          player: userType // Most runner up ever.
          amount: number
        }
        bestWinStreak: {
          player: userType // The most times in a row a user has won.
          amount: number
        }
        bestPointsStreak: {
          player: userType // The most times in a row a user has scorred points.
          amount: number
        }
      }
      seasons: {
        season: string
        mostPlayers: number // Most players to be a part of the champ concurrently.
        mostWins: {
          player: userType // Most wins this season.
          amount: number
        }
        mostRunnerUp: {
          player: userType // Most runner up this season.
          amount: number
        }
        bestWinStreak: {
          player: userType // The most times in a row a user has won.
          amount: number
        }
        bestPointsStreak: {
          player: userType // The most times in a row a user has scorred points.
          amount: number
        }
      }[]
    }
  }
  created_at: string
  updated_at: string
  tokens: string
}

export interface protestType {
  _id: string
  championship: champType
  createdBy: userType
  title: string
  description: string
  vote: boolean
  voteArr: {
    user: userType
    approve: boolean
  }[]
  created_at: string
  updated_at: string
  tokens: string
}

export interface ruleChangeType {
  _id: string
  championship: champType
  createdBy: userType
  title: string
  description: string
  vote: boolean
  voteArr: {
    user: userType
    approve: boolean
  }[]
  voteExipiry: string
  created_at: string
  updated_at: string
  tokens: string
}

export interface badgeType {
  _id: string
  championship: champType
  url: string
  name: string
  rarity: number
  awardedTo: userType[]
  created_at: string
  updated_at: string
  tokens: string
}
