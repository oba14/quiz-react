import React from "react";

function Progress({ current, total }) {
  return (
    <h2 data-testid="progress-check">
      Question {current} of {total}
    </h2>
  );
}

export default Progress;
