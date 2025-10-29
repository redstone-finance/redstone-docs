# Centralized Custody Sub-Methodology

The **Credora Centralized Custodian Sub-Methodology** evaluates the creditworthiness of custodians responsible for holding assets backing derivative tokens and stablecoins. This methodology sits at the **Sub-Methodology layer** of the **Credora Token Rating Framework.**

![](<../../assets/0 (3).png>)

The Credora Centralized Custodian Sub-Methodology analysis begins with the determination of the Anchor PD, which serves as the baseline measure of risk, and applies a series of modifiers that adjust the PD and implied rating based on specific factors. The final outcome reflects risk exposures of the custodian pertaining to operational, regulatory, governance risks, as well as risks inherent to the business of digital asset custody. The methodology is informed by historical default events with respect to digital asset custodians and calibrated via an empirical analysis of these default events to ensure adequate capturing of key risks related to digital asset custody business.

This framework combines quantitative and qualitative factors to produce a PD and a corresponding implied rating, which are used as inputs for further calibration in the subsequent methodology layers. See the [Token Rating Framework](../) for further details on the architecture and interlinkages of various token methodologies.

### Anchor PD <a href="#plj2nif1psea" id="plj2nif1psea"></a>

The Anchor PD is derived by evaluating the average PD of the global custodian industry. The global custodian industry is represented by members of the Association of Global Custodians (AGC). The Association comprises highly established custodians, such as Northern Trust, State Street, and J.P. Morgan, whose creditworthiness reflects decades of operational history, strong regulatory oversight, and robust financial profiles. The average PD for these institutions is calculated using their counterparty risk ratings from U.S. credit rating agencies.

For the global custodian industry, the calculated average PD is less than 0.01%, reflecting an exceptionally low likelihood of default among these highly-rated institutions. This serves as the baseline PD of this methodology.

### Modifiers <a href="#id-7ctgur3jrvbf" id="id-7ctgur3jrvbf"></a>

The lower operational track record of digital asset custodians and their relatively higher incidents of default necessitate additional modifiers to adequately capture their risk profiles relative to the Anchor PD derived in the previous step. Digital asset custodians often operate with less regulatory oversight, face greater technological risks, and are exposed to heightened market volatility compared to their traditional counterparts.

To account for these additional risks, the Anchor PD derived from the global custodian average is modified downward through the application of a series of modifiers explained below. These adjustments incorporate factors such as financial transparency, regulatory oversight, operating history, insurance coverage, and governance.

#### Listed Status and Financial Transparency <a href="#ty0vypk08aug" id="ty0vypk08aug"></a>

The **Listed Status and Financial Transparency** modifier evaluates the custodian's financial transparency and governance practices. Public crypto custodians receive a -3 notch adjustment, reflecting the baseline risk differential between crypto custodians and the benchmark set by global custodians used in the Anchor PD calculation (i.e. the global custodians that are included in the Anchor PD calculation). Conversely, private custodians are not subject to similar transparency obligations, including the requirement to generate public, audited financial statements. As such, private institutions receive a -4 maximum notch adjustment.

Custodians that have completed at least one SOC II audit receive a +0.5 notch offset, which mitigates the overall negative adjustment applied under the Listed Status and Financial Transparency modifier.

#### Regulatory Oversight and Licensure <a href="#kk2cqptv0cuo" id="kk2cqptv0cuo"></a>

The **Regulatory Oversight and Licensure** adjustment reflects the quality of the custodian’s operating jurisdiction, the presence and strength of fiduciary duty, applicable licensure, and the use of MPC technology.

This factor serves as a key component in assessing credit risk, as entities operating under robust regulatory frameworks are less prone to operational instability. Higher regulatory scrutiny also minimizes the likelihood of ethical misbehavior. Conversely, entities with weaker regulatory oversight face higher levels of credit risk due to potential vulnerabilities in governance, compliance, and operational processes.

The regulatory oversight adjustment is comprised of four inputs: Jurisdiction Tier, Fiduciary Inheritance, Charter Type, and MPC status.

- **Jurisdiction**: The input to the Jurisdiction modifier is the primary country from which the custodian operates. The Regulatory Oversight Index is used to determine the country's relative ranking, drawing on data from the Basel Anti-Money Laundering Index and the World Bank Ease of Doing Business Index. These indicators help quantify the strength and effectiveness of the jurisdiction’s regulatory and legal environment.

| Primary Jurisdiction | Notch Adjustment |
| -------------------- | ---------------- |
| Tier 1               | -0.25            |
| Tier 2               | -0.50            |
| Tier 3               | -0.75            |

- **Fiduciary Inheritance**: The Fiduciary Inheritance factor assesses how the custodian’s fiduciary duty is established, whether through regulatory designation, statutory mandate, or contractual agreement. Regulatory assignment of fiduciary duty is considered the strongest form because it imposes enforceable obligations through a supervisory framework, often including oversight by regulatory agencies, mandatory compliance programs, and meaningful penalties for breach. This regulatory backing creates clearer alignment with client interests and reduces discretion in how fiduciary standards are applied. In contrast, statutory and contractual fiduciary duties, while still enforceable, may offer less consistent protection due to weaker enforcement mechanisms, limited oversight, or greater variability in interpretation and application.&#x20;

| Fiduciary Inheritence | Notch Adjustment |
| --------------------- | ---------------- |
| Regulatory            | -0.50            |
| Statutory             | -1.00            |
| Contractual           | -1.25            |
| None                  | -2.50            |

- **Charter Type**: The Charter Type factor evaluates the strength and regulatory rigor of the custodian’s operating license. Tier 1 charters—such as federally regulated banks and nationally licensed trust companies—offer the highest level of institutional oversight, prudential standards, and client protections. Tier 2 covers state-chartered or regionally licensed entities that meet qualifying conditions (QC) for compliance, offering moderate but credible regulatory coverage. Tier 3 includes Virtual Asset Service Providers (VASPs) or entities with minimal or no formal licensure; these structures generally lack comprehensive supervision, leading to elevated operational and legal risk exposures.

| Charter Type | Notch Adjustment |
| ------------ | ---------------- |
| Tier 1       | -0.50            |
| Tier 2       | -1.00            |
| Tier 3       | -1.25            |
| None         | -1.50            |

- **MPC Wallet Offerings**: This factor assesses the presence of Multi-Party Computation (MPC) wallet solutions. MPC wallets enhance security by eliminating single points of private key failure. Their distributed approach mitigates risks related to key compromise, insider threats, and physical security breaches, thereby reducing overall custodial risk. Custodians with no fiduciary duty whose architecture relies on MPC wallets receive a positive 0.75 notch adjustment.

| MPC Provider | Notch Adjustment |
| ------------ | ---------------- |
| Yes          | 0.75             |
| No           | 0.00             |

These modifiers are designed to assess the specific level of supervision and regulatory rigor governing each custodian, providing a refined measure of risk reduction based on jurisdictional and institutional characteristics.

#### Operating History Modifier <a href="#s2028rbo5bwq" id="s2028rbo5bwq"></a>

**Track Record**

The Operating History modifier is designed to distinguish custodians with established, proven track records from newer entrants with limited operational experience. This differentiation is critical in the context of digital asset custody, where institutions with short operating histories have frequently been associated with high-profile failures and governance lapses. By contrast, a long-standing track record signals greater institutional maturity, operational discipline, and investor confidence.

The modifier is capped at -3.0 and normalized to a 2011 baseline—meaning a custodian established in 2011 or earlier receives the most favorable score with no adjustment. More recent entrants are subject to increasing penalties that reflect elevated uncertainty and the greater likelihood of operational missteps.

#### Insurance <a href="#of8h6kbn80hf" id="of8h6kbn80hf"></a>

Insurance coverage is an indicator of enhanced risk management and operational controls. Insurers conduct their own due diligence before underwriting policies, and the provision of coverage signals a degree of confidence in the custodian’s governance, security, and operational standards. This added layer of scrutiny bolsters the custodian's creditworthiness.

For custodians operating in the digital asset sector, the existence of insurance policies indicates adherence to higher standards of operational risk management, which is particularly valuable in a sector characterized by technological and regulatory uncertainties. Custodians having verified insurance coverage and transparent public disclosures benefit from a +0.5 notch adjustment, reflecting the reduced operational risk and enhanced credibility stemming from insurer oversight. This adjustment ensures that the methodology accounts for the role of insurance as a risk mitigant and a proxy for external validation of the custodian’s practices.

### Outputs <a href="#lyogxmmt1srm" id="lyogxmmt1srm"></a>

The Final PD and implied rating are determined by sequentially applying each modifier to the Anchor PD. The cumulative effect of these adjustments reflects the custodian’s overall risk profile.

The outputs of this sub-methodology are utilized as inputs in the Anchor PD of the Derivative Tokens Methodology or Stablecoins methodology, which are [Calibration Layer](../calibration-layer/) methodologies.
