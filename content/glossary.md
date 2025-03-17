# Glossary

Here are the most commonly used terms and abbreviations used in the reserve markets domain. 

|Acronym |Term |Definition |
|-------------|-------------|-------------|
|AOF |Activation Optimization Function |The role to operate the algorithm applied for the optimisation of the activation of Balancing Energy bids within a Coordinated Balancing Area. |
|BEGCT |Balancing Energy Gate closure time |The point in time when submission or update of a balancing energy bid is no longer permitted |
|(BSP GCT) |||
|BEGOT |Balancing Energy Gate opening time |The first point in time when submission of a balancing energy bid is permitted |
|BRP |Balance Responsible Party |A market participant or its chosen representative responsible for its imbalances |
|BSP |Balancing Services Provider |A market participant with reserve-providing units or reserve-providing groups able to provide balancing services to TSOs |
|CIM |IEC Common Information Model |A standard for describing information about an electrical network. The European style market profile is a profile derivation from the CIM to harmonize the energy market data exchanges in Europe. |
|CMOL|Common Merit Order List|A combined list of local balancing energy bid lists (MOL) from each price area maintained by the PICASSO platform|
|CZC |Cross Zonal Capacity |The cross-zonal transmission capacity between two bidding zones |
|FAT |Full Activation Time |The period between the activation request by the connecting TSO and the corresponding full delivery of the concerned product |
|FRCE|Frequency Restoration Control Error|PICASSO platform calculates every optimization cycle a frequency restoration control error for each LFC area. This error acts as an input for the LFC optimization calculation. |
|||The sign convention is: positive value where the LFC area is in power surplus and indicates that negative aFRR balancing energy needs to be activated; and negative value where the LFC area is in power deficit and indicates that positive aFRR balancing energy needs to be activated.|
|ECP |Energy Communication Platform |Reference implementation of MADES standard |
|ETP|Entso-E Transparency Platform|The ENTSO-E Transparency Platform is an online data platform for European electricity system data|
|ISP |Imbalance Settlement Period |The time unit for which balance responsible parties' imbalance is calculated |
|LFC|Load Frequency Control|A TSO system to maintain reasonably uniform frequency, to divide the load between the generators and to control the tie-line interchange schedules. Receives input from the PICASSO platform and distributes aFRR control signal to BSP’s within the LFC area. |
|LFC AREA|Load Frequency Control Area|The control area to which the aFRR providing units or aFRR providing groups shall deliver the aFRR standard balancing energy.|
|LMOL|Local Merit Order List|After the BSP GCT the TSO creates a merit order list consisting of balancing energy bids from the BSP’s in the respectitive LFC area which will be sent to PICASSO platform. Often just referred as MOL. |
|MADES |Market Data Exchange Standard |Communication IEC standard designed by ENTSO-E |
|MOL |Merit Order List |A list of balancing energy bids sorted in order of their bid prices, used for the activation of those bids |
|MTU |Market Time Unit |The period for which the market price is established as a result of PICASSO platform optimization cycle. For PICASSO the MTU is 4 seconds. |
|CC|Control Cycle|Period in which a single optimization result is calculated in LFC and new control signals (if changed from previous cycle) are sent from TSO to BSP’s|
|OC|Optimization cycle|Period in which a single optimization result is calculated in PICASSO platform and new FRCE values are sent to each LFC area. Current optimization cycle is 4 seconds, equal to MTU. |
|TSO |Transmission System Operator |A party that is responsible for a stable power system operation (including the organisation of physical balance) through a transmission grid in a geographical area. In the Nordic synchronous area, there are four TSOs: Svenska kraftnät, Fingrid, Energinet.dk and Statnett. |
||Connecting TSO |the TSO that operates the scheduling area in which balancing service providers and balance responsible parties shall be compliant with the terms and conditions related to balancing; |
|TSO GCT |TSO energy bid submission gate closure time |The latest point in time when a connecting TSO can forward the balancing energy bids received from a balancing service provider to the activation optimisation function |
|VP|Validity Period|The time period when the balancing energy bid offered by the BSP can be activated, whereas all the characteristics of the product are respected. The amount of time for which a bid is valid and firm. The first validity period of each day begins right at 00:00 market time. Validity periods are consecutive and not overlapping. The length of a single validity period is 15 minutes. |
