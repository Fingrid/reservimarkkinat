# Document structure
In this page you can find information about the structure and attributes of various documents related to the market.
## Bid document
aFRR energy bids are submitted to the market as a *ReserveBid_MarketDocument*. The document contains one or multiple Bid Time Series, along with other document-wide information.
### Table of bid document attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the document in UUID form |
| revisionNumber | Always 1 |
| Type | Always A37 (ReserveBidDocument) |
| process.processType | Always A51 (afRR) |
| sender_MarketParticipant.mRID | Identification of the sender party |
| sender_MarketParticipant.marketRole.type | One of A46 (BSP) or A39 (Service Provider/Data Provider) | 
| receiver_MarketParticipant.mRID  | The TSO's EIC identification | 
| receiver_MarketParticipant.marketRole.type | Always A04 (TSO) | 
| createdDateTime  | Time of document creation, format: YYYY-MM-DDTHH:MM:SSZ | 
| reserveBid_Period.timeInterval | Time period covered in the bid document, same format as above, start and end time | 
| domain.mRID | EIC identification of the control area, for Finland 10YFI-1--------U | 
| subject_MarketParticipant.mRID  | EIC Identification of the party responsible for the bid | 
| subject_MarketParticipant.marketRole.type | Always A46 (BSP) | 
### Bid Time Series
The bid time series contains attributes related to individual bids. A Bid document may contain multiple Bid Time Series.
### Table of Bid Time Series attributes
## Availability document
Availability documents are sent one minute after the bid availability period has ended. BSPs receive one if the bid has been set to partially or completely unavailable during the market period. If the bid was available, no availability document will be sent, as bids are available by default.
## Acknowledgement document
A bid is submitted to the market once the bid document has been acknowledged with a positive acknowledgement document.
