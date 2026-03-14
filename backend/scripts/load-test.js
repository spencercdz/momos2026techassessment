import autocannon from "autocannon";

const target = process.env.TARGET_URL || "http://localhost:3001";
const url = `${target.replace(/\/$/, "")}/api/shorten`;

const connections = Number(process.env.CONNECTIONS || 50);
const duration = Number(process.env.DURATION || 20);

const instance = autocannon(
  {
    url,
    method: "POST",
    connections,
    duration,
    body: JSON.stringify({ url: "https://example.com/some/very/long/url" }),
    headers: {
      "content-type": "application/json",
      // Signal to the backend that this is a load test so it
      // can avoid persisting rows while still exercising the code path.
      "x-load-test": "1"
    }
  },
  (err, result) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log("\nLoad test complete:");
    console.log(`Requests: ${result.requests.total}`);
    console.log(`2xx: ${result['2xx']}`);
    console.log(`Latency avg: ${result.latency.average} ms`);
    console.log(`RPS: ${result.requests.average}`);
  }
);

autocannon.track(instance, { renderProgressBar: true });
