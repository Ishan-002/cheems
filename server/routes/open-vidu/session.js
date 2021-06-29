const express = require('express');
const router = express.Router();
const axiosInstance = require('./axiosInstance');

// TODO: Handle other http request codes also, when there's something else than 200

// @route POST api/session
// @desc Create a new OpenVidu session and return a connection token to the client
// @access Protected
router.post('/api/session', (req, res) => {
  axiosInstance
    .post('/openvidu/api/sessions', {
      headers: {
        // TODO: Use customSessionId in headers to override the OpenVidu given sessionId
      },
    })
    .then((response) => {
      const session = JSON.parse(response.body);
      const sessionId = session.id;

      return axiosInstance.post(
        `/openvidu/api/sessions/${sessionId}/connection`,
        // TODO: See openVidu roles and add roles for publisher and moderator according to the admin roles of user
        {}
      );
    })
    .then((response) => {
      const connection = JSON.parse(response.body);
      const connectionToken = connection.token;
      return res.status(200).json({ connectionToken: `${connectionToken}` });
    })
    .catch((error) => {
      return Promise.reject(error);
    });
});

// @route POST api/session/:sessionId
// @desc Adds a new connection to an OpenVidu session
// @access Protected
router.post('/api/session/:sessionId', (req, res) => {
  axiosInstance
    .post(
      `/openvidu/api/sessions/${req.params.sessionId}/connection`,
      {}
      // TODO: See openVidu roles and add roles for publisher and moderator according to the admin roles of user
    )
    .then((response) => {
      const connection = JSON.parse(response.body);
      const connectionToken = connection.token;
      return res.status(200).json({ connectionToken: `${connectionToken}` });
    })
    .catch((error) => {
      return Promise.reject(error);
    });
});

// @route DELETE api/:sessionId/:connectionId
// @desc Deletes an openVidu connection and also deletes the corresponding sessions if there are no connections left
// @access Protected
router.delete('/api/:sessionId/:connectionId', (req, res) => {
  axiosInstance
    .delete(`/openvidu/api/sessions/${sessionId}/connection/${connectionId}`)
    .then((response) => {
      return axiosInstance.get(
        `/openvidu/api/sessions/${sessionID}/connection`
      );
    })
    .then((response) => {
      const connections = JSON.parse(response.body);
      if (connections.numberofElements == 0) {
        return axiosInstance.delete(`openvidu/api/sessions/${sessionId}`);
      } else {
        return Promise.resolve('Successfully deleted');
      }
    })
    .then((response) => {
      return res.status(200);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
});

module.exports = router;
