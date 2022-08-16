package adapter

import (
	"encoding/json"
	"fmt"
	"io"

	"github.com/HackYourCareer/SmartKickers/internal/config"
)

type ShotMessage struct {
	Speed float64
	Team  int
}

type tableShotParams struct {
	TimeStart int     `json:"TimeStart"`
	TimeEnd   int     `json:"TimeEnd"`
	Speed     float64 `json:"Speed"`
	StartArea int     `json:"StartArea"`
	EndArea   int     `json:"EndArea"`
	GameID    string  `json:"GameID"`
	Sequence  int     `json:"Sequence"`
	ID        string  `json:"ID"`
}

type tableShotMsg struct {
	Mode        string            `json:"mode"`
	MessageType string            `json:"messageType"`
	Params      []json.RawMessage `json:"messages"`
}

func UnpackShotMsg(message io.Reader) (ShotMessage, error) {
	var (
		shotMessage tableShotMsg
		params      tableShotParams
	)

	err := json.NewDecoder(message).Decode(&shotMessage)
	if err != nil {
		return ShotMessage{}, err
	}

	if len(shotMessage.Params) == 0 {
		return ShotMessage{}, fmt.Errorf("missing shot parameters")
	}

	err = json.Unmarshal(shotMessage.Params[0], &params)
	if err != nil {
		return ShotMessage{}, err
	}

	teamID, err := decodeTeam(params.StartArea)
	if err != nil {
		return ShotMessage{}, err
	}

	return ShotMessage{
		Speed: params.Speed,
		Team:  teamID,
	}, nil
}

func decodeTeam(areaID int) (int, error) {
	for _, w := range config.WhiteTeamArea {
		if w == areaID {
			return config.TeamWhite, nil
		}
	}

	for _, b := range config.BlueTeamArea {
		if b == areaID {
			return config.TeamBlue, nil
		}
	}

	return 0, fmt.Errorf("couldn't decode teamID")
}
