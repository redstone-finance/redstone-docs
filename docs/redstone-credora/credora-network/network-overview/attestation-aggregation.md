# Attestation Aggregation

Consensus Ratings are the output of an aggregation process, which considers all valid attestations from Credora and Reviewers. The weighting of attestations is a critical component of the aggregation process. Initially, the weighting scheme is simple. Over time, the expectation is for the community to further align on the appropriate weighting scheme.&#x20;

Reviewer attestations include a rating, and the corresponding 1-year probability of default according to the [Credora PD Curve](https://app.gitbook.com/s/0jtQ8eeguzChYC3Ubiu5/core-methodology-concepts). All reviewer attestations are by default active for a 3 month period, ensuring that Reviewer input is a reflection of up-to-date information. Each Reviewer is only allowed 1 active attestation per asset, and Reviewers are capable of updating their input at their discretion.&#x20;

As Credora’s input is reflective of a community-driven standardized methodology, it initially carries additional weight in the aggregation process. The Credora methodology is public, and will evolve over time.

### Aggregation Logic

**Valid Attestations** are defined as the quantity of active, non-Credora attestations. The formula for determining Credora’s input weight is as follows:

$$
Credora Weight = a / (Valid Attestations^b)
$$

Initially, a is set as 0.75 and b is set as 0.5.

Reviewer inputs are initially equally weighted. The formula for determining Reviewer input weight is as follows:

$$
Reviewer Weight = (1 - Credora Weight) / Valid Attestations
$$

The following table demonstrates the weights for Credora and each independent Reviewer, depending on the count of Valid Attestations.

| Valid Attestations | Credora Weight | Reviewer Weight |
| ------------------ | -------------- | --------------- |
| 0                  | 100.0%         | 0.00%           |
| 1                  | 75.0%          | 25.00%          |
| 2                  | 53.0%          | 23.48%          |
| 3                  | 43.3%          | 18.90%          |
| 4                  | 37.5%          | 15.63%          |
| 5                  | 33.5%          | 13.29%          |
| 10                 | 23.7%          | 7.63%           |
| 15                 | 19.4%          | 5.38%           |
| 20                 | 16.8%          | 4.16%           |
| 25                 | 15.0%          | 3.40%           |

\
To further demonstrate the mechanics, consider an example where there are 4 Valid Attestations on Feb 1st. The Credora Weight is 37.5% and each individual Reviewer Weight is 15.63%. In total, 37.5% + (4 \* 15.6%) = 100%.

- On Feb 2nd, one of the Valid Attestations expires. The Credora Weight is 43.3% and each individual Reviewer Weight is 18.9%. In total, 43.3% + (3 \* 18.9%) = 100%.
- On Feb 3rd, there are two new Valid Attestations. The Credora Weight is 33.5%, and each individual Reviewer Weight is 13.3%. In total, 33.5% + (5 \* 13.3%) = 100%.

### Future State

The specific aggregation logic will be further refined by the community. This will require active discussion around the following:

- What is the appropriate weight for the standardized methodology input?
- As Reviewers are further differentiated based on their performance, what is the appropriate relative weight to assign to their inputs?

Attestation weights are a critical component of the Credora Network. By refining the attestation aggregation logic, the Credora Network can produce higher quality outputs.\
