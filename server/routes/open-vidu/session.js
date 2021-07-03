const express = require('express');
const router = express.Router();
const axiosInstance = require('./axiosInstance');

// TODO: Handle other http request codes also, when there's something else than 200

// @route POST api/session
// @desc Create a new OpenVidu session and return a connection token to the client
// @access Protected
router.post('/', (req, res) => {
  axiosInstance
    .post('/openvidu/api/sessions', {
      headers: {
        // TODO: Use customSessionId in headers to override the OpenVidu given sessionId
      },
    })
    .then((response) => {
      const session = response.data;
      const sessionId = session.id;

      return axiosInstance.post(
        `/openvidu/api/sessions/${sessionId}/connection`,
        // TODO: See openVidu roles and add roles for publisher and moderator according to the admin roles of user
        {}
      );
    })
    .then((response) => {
      const connection = response.data;
      const connectionToken = connection.token;
      return res.status(200).json({ connectionToken: `${connectionToken}` });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    });
});

// @route POST api/session/:sessionId
// @desc Adds a new connection to an OpenVidu session
// @access Protected
router.post('/:sessionId', (req, res) => {
  console.log(`/openvidu/api/sessions/${req.params.sessionId}/connection`);
  axiosInstance
    .post(
      `/openvidu/api/sessions/${req.params.sessionId}/connection`,
      {}
      // TODO: See openVidu roles and add roles for publisher and moderator according to the admin roles of user
    )
    .then((response) => {
      console.log(response.data);
      const connection = response.data;
      const connectionToken = connection.token;
      const connectionId = connection.connectionId;
      return res.status(200).json({
        connectionToken: `${connectionToken}`,
        connectionId: `${connectionId}`,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    });
});

// @route DELETE api/session/:sessionId/:connectionId
// @desc Deletes an openVidu connection and also deletes the corresponding sessions if there are no connections left
// @access Protected
router.delete('/:sessionId/:connectionId', (req, res) => {
  axiosInstance
    .delete(
      `/openvidu/api/sessions/${req.params.sessionId}/connection/${req.params.connectionId}`
    )
    .then((response) => {
      return axiosInstance.get(
        `/openvidu/api/sessions/${req.params.sessionId}/connection`
      );
    })
    .then((response) => {
      const connections = response.data;
      if (connections.numberofElements == 0) {
        return axiosInstance.delete(
          `openvidu/api/sessions/${req.params.sessionId}`
        );
      } else {
        return Promise.resolve('Successfully deleted');
      }
    })
    .then((response) => {
      return res.status(200);
    })
    .catch((error) => {
      return res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
