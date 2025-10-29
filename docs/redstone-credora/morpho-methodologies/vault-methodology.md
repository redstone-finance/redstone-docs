# Vault Methodology

### Morpho Vaults <a href="#xeck3uw8ckk" id="xeck3uw8ckk"></a>

Morpho is a permissionless and non-custodial lending protocol. Morpho Vaults are designed to provide a passive lending experience by allowing users access to curated risk profiles and management. Vaults carry exposures across multiple underlying markets, creating a portfolio of risks tied to the performance of those markets.&#x20;

In the Morpho Protocol, curators play a critical role in managing and mitigating risks associated with vaults and underlying exposures. They are responsible for selecting and configuring risk profiles by allocating assets across multiple markets, aiming for an optimal balance between risk and return. Beyond market selection, curators actively monitor market dynamics and adapt allocations to changing conditions, safeguarding the vault’s overall performance. Their expertise, track record, and operational effectiveness are central to the vault’s robustness, as well-managed vaults demonstrate stronger risk mitigation practices and greater resilience during periods of market volatility. In addition, the vault owners have the ability to introduce certain protective mechanisms such as guardians or timelocks that protect vault investors against adverse changes in a vault’s risk profile. Ultimately, curators and the protective mechanisms in place serve as key risk stewards, shaping the vault’s stability and risk profile.

### Vault Rating Methodology <a href="#e7lewyl3r9am" id="e7lewyl3r9am"></a>

The Morpho Vault Rating Methodology determines the Anchor Vault PSL by calculating a weighted average PSL of the markets utilized in the vault. This approach reflects proportional risk contributions of each market based on the vault’s asset allocations. By weighing the PSL of individual markets according to their relative share in the vault’s portfolio, the methodology provides a comprehensive view of the vault’s overall risk profile. This calculation accounts for active allocations and unallocated markets, ensuring potential shifts in exposure are incorporated into the risk assessment.

To refine the Anchor Vault PSL and arrive at the Final Vault PSL and implied rating, two modifiers are applied. The Curator Modifier assesses the curator’s track record, expertise, and operational effectiveness, while the Governance Modifier evaluates the robustness of protective mechanisms, such as guardians and timelocks. These refinements ensure that the final assessment accounts for aggregated market risks and vault-specific management and governance factors.

#### Anchor PSL <a href="#ljx6yk41cge3" id="ljx6yk41cge3"></a>

The Anchor PSL of a Morpho vault is calculated as a weighted average of the underlying markets the vault is exposed to, assigning weights based on the relative allocation of the vault’s assets. This approach provides a portfolio view of the vault’s overall risk profile by capturing the contributions of each market.

#### Modifiers <a href="#nes04ms2bf8g" id="nes04ms2bf8g"></a>

After determining the **Anchor Vault PSL**, two modifiers are applied to refine the PSL further, capturing unique characteristics of the vault that are not directly tied to individual market exposures.

**Curator**

The curator modifier evaluates the track record and expertise of the vault’s manager. Similar to risk assessments for asset managers in traditional finance, this modifier quantifies the curator’s experience and track record. It evaluates their decision-making ability, expertise in configuring a bug-free vault, and capability to manage the vault's overall risk profile. This adjustment reflects the premise that well-managed vaults with experienced curators demonstrate stronger risk mitigation practices, and adaptability to market conditions, while being less prone to allocating capital into misconfigured markets.

This modifier incorporates multiple factors, as outlined in the below table.

<table><thead><tr><th width="315">Metric</th><th>Description</th></tr></thead><tbody><tr><td>Track Record (Months)</td><td>The length of time the curator has actively managed vaults on Morpho. A longer track record indicates greater experience, credibility, and competence in managing vaults, navigating market conditions, and implementing risk management practices.</td></tr><tr><td>Assets Under Management (AUM)</td><td>The total value of assets managed by the curator across Morpho vaults. Higher AUM reflects stronger market confidence, operational capacity, and the ability to manage risks effectively while optimizing performance.</td></tr><tr><td>Number of Active Pools</td><td>The number of active markets or pools managed by the curator, representing operational breadth. A larger number of pools indicates the curator's ability to configure and manage tailored vaults effectively.</td></tr></tbody></table>

These factors are used as inputs to calculate an index score, which is a composite score calculated by weighing the above factors (track record, AUM, and active pools) to quantify the curator’s experience and risk management capabilities.

The index score is then categorized into the following tiers presented in the table below, each with its respective notch adjustment.

<table data-full-width="true"><thead><tr><th width="167">Tier</th><th width="223">Notch Adjustment</th><th>Description</th></tr></thead><tbody><tr><td>Tier 1</td><td>0.25</td><td>Curators with exceptional track records, large AUM, and significant vault management volume.</td></tr><tr><td>Tier 2</td><td>0</td><td>Curators with moderate scores, demonstrating adequate experience and capacity.</td></tr><tr><td>Tier 3</td><td>-0.25</td><td>Curators with lower scores, reflecting limited experience and operational capability.</td></tr></tbody></table>

**Governance**

The Governance Modifier serves to refine the outputs by assessing the protective mechanisms embedded in its operational structure, specifically focusing on the guardian type and timelock features. These mechanisms are evaluated for their effectiveness in mitigating operational risks and enhancing the security of vault suppliers' funds.

**Guardian**

The type of guardian mechanism employed by the vault plays a critical role in ensuring oversight and security. The assessment includes:

<table data-full-width="true"><thead><tr><th width="215">Guardian Type</th><th width="172">Notch Adjustment</th><th>Description</th></tr></thead><tbody><tr><td>No Guardian</td><td>-0.5</td><td>Vaults without a dedicated guardian face higher operational risks due to the absence of oversight mechanisms.</td></tr><tr><td>Multi-Sig Guardian Contract</td><td>0</td><td>A multi-signature contract requires approval from multiple parties for critical decisions, ensuring accountability and reducing the risk of unilateral actions.</td></tr><tr><td>DAO Structure</td><td>0.25</td><td>Vaults governed by a DAO benefit from transparent, distributed oversight involving multiple stakeholders, enhancing governance strength and minimizing single points of failure.</td></tr></tbody></table>

**Timelock**

The timelock feature further enhances security by introducing a delay in the execution of critical actions, providing a buffer to address potential vulnerabilities or unauthorized activities. The timelock adjustment is determined as follows:

<table data-full-width="true"><thead><tr><th width="216">Timelock Duration</th><th width="182">Notch Adjustment</th><th>Description</th></tr></thead><tbody><tr><td>24 Hours to 48 Hours</td><td>-0.25</td><td>Shorter timelocks provide limited protection against abrupt or changes, as the response window for stakeholders is constrained.</td></tr><tr><td>48 Hours to 72 Hours</td><td>0</td><td>A moderate timelock offers balanced protection, allowing stakeholders sufficient time to respond.</td></tr><tr><td>72 Hours to 7 Days</td><td>0.25</td><td>Longer timelocks enhance security by extending the response window.</td></tr></tbody></table>

The governance adjustment is calculated as the average of the guardian and timelock adjustments. This approach ensures a balanced consideration of both governance mechanisms and their collective impact on the overall risk profile of the vault.

For example, in the case of the Moonwell Flagship ETH vault:

- **Guardian Type:** Multi-Sig Guardian Contract (0 Notch Adjustment)
- **Timelock:** 96 Hours (+0.25 Notch Adjustment)
- **Governance Adjustment:** (0 + 0.25) / 2 = +0.125 Notch Adjustment

If the Governance Adjustment results in a negative score, the magnitude of the adjustment is reduced by half for Tier 1 curators to account for their track record to manage vault allocations effectively. This ensures that experienced curators are not excessively penalized for governance structures that, while less restrictive, may be strategically advantageous in certain conditions.

#### Final Vault Adjustment <a href="#ecyyackfow77" id="ecyyackfow77"></a>

After the evaluation of each modifier, the total vault adjustment is determined by summing up the notch adjustment calculated for each modifier. The total is used to adjust the Anchor Vault PSL to determine the Final PSL and implied rating.
