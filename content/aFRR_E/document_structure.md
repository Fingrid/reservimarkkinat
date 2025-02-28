# Document structure
In this page you can find information about the structure and attributes of various documents related to the market.
## Bid document
aFRR energy bids are submitted to the market using a *ReserveBid_MarketDocument*. The document contains one or multiple Bid Time Series, along with other document-wide information. For aFRR energy market, version 7.4 of the *ReserveBid_MarketDocument* is used. 
### Bid Time Series
The bid time series contains attributes related to individual bids. A Bid document may contain multiple Bid Time Series.
## Availability document
Availability documents are sent one minute after the bid availability period has ended. BSPs receive one if the bid has been set to partially or completely unavailable during the market period. If the bid was available, no availability document will be sent, as bids are available by default.
## Acknowledgement document
A bid is submitted to the market once the bid document has been acknowledged with a positive acknowledgement document.
