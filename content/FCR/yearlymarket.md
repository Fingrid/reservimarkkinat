# FCR Yearly Market
In addition to the FCR hourly market, Fingrid procures FCR reserves from the yearly market. The below table describes the differences between hourly and yearly markets. Each FCR product - FCR-N, FCR-D up, and FCR-D down, have their own hourly and yearly markets. The technical requirements are the same between markets.

| Attribute | Yearly market | Hourly market |
|-----------|-------------|-------------|
| Participation | Tendering held once a year, can't join mid-year | Can join mid-year as soon as technical requirements met |
| Procurement | Fingrid purchases the full planned amount according to the planned resources sent | Required amount of bids accepted in price order |
| Gate closure time for plan/bid submission | Every day 18:00 | Every day 18:30 |
| Capacity | BSP must maintain their approved capacity | BSP can submit bids for their capacity daily.<br>Note: BSPs participating in the yearly market can only participate in the hourly market after maintaining their capacity in the yearly market. |
| Pricing | Price determined for the whole year, determined by the highest accepted yearly bid | Price determined for every hour, determined by the highest accepted bid for the hour |

## Planned Resource Document
BSPs can submit Planned Resource Documents to the FCR yearly market for the next day, for which the TSO is obligated to enumerate the BSP up to the contracted amount.
### Validation rules
* Recommended maximum time interval of the Planned Resource Schedule document is 30 days.
* Reserve plans for the next day must be submitted by 18:00 EE(S)T
* Revision number is always 1
* Reserve plan volume can have one decimal.
* Decimal separator must be a period.
* Document identification must be in UUID format
* EIC code shall be used as sender identification code and subject party code.
* Time stamps must be in ISO 8601 UTC format
* It is not allowed to submit reserve plans that exceed the yearly market contracted amount

The table below contains a list of error texts included in the acknowledgement document in case the validation of a planned resource document fails:
| Description | Level of validation| Error text |
|-----------|-------|-------|
|**Schedule Market Document**|||
|Document Identification is mandatory|Message|Message reference missing.|
|Document Identification must be in UUID format|Message|Message reference must be in correct format.|
|Document type must be filled out correctly|Message|DocumentType missing.<br>DocumentType for FCR Reserve Plans must be A26|
|Process type must be filled out correctly|Message|ProcessType not valid|
|Message must be received within a given time|Message|Message was received after deadline. Gate closure for FCR Reserve plans is D-1 18:00 EET|
|Sender Identification must be connected to the Subject Party|Message|Sender is not connected to the Subject Party. |
|Message must contain correct ReceiverIdentification|Message|ReceiverIdentification missing.<br>ReceiverIdentification is wrong|
|Message must contain correct subject party|Message|Subject party missing<br>Subject party not found.|
|Time stamp of the document must be in correct format|Message|createdDatetime format is incorrect<br>Decimals are not allowed in createdDatetime|
|Time interval of the document must be in correct format|Message|SchedulePeriodTimeInterval not in correct format|
|**Time Series**|||
|TimeSeries Identification is mandatory<br>TimeSeries Identification must be in UUID format|Time series|TimeSeriesIdentification missing<br>TimeSeriesIdentification must be in correct format|
|Business type must be correct|Time series|Business type missing<br>Message can only contain FCR-N or FCR-D reserve plans|
|Flow direction must be correctly specified|Time series|Direction required<br>Flow direction must be A03 for FCR-N (C26)<br>Flow direction must be A01 or A02 fir FCR-D (C27)|
|Product definition must be Active Power|Time series|Product definition is wrong.|
|Connecting domain must be Finland|Time series|Connecting domain must be 10YFI-1--------U|
|Measurement unit must be MAW|Time series|Quantity unit must be MAW.|
|marketAgreement type must be specified
correctly|Time series|Market agreement type required<br>MarketAgreementType must be A04|
|Time interval of the series must be in correct format|Time series|Period TimeInterval not in correct format|
|TimeSeries interval must be included in Document time interval|Time series|Period is not in header timeinterval|
|Bid Periods are not allowed to overlap|Time series|Periods are overlapping|
|Resolution not specified correctly|Time series|Resolution must be PT60M or PT1H|
|Point position within a period must begin with 1|Time series|Point position within a period must begin with 1<br>Point position ‘x’ is missing from period<br>Position ‘x’ is not valid for period<br>Points must be in order by position number|
|Quantity is required|Time series|Quantity required|
|Quantity must be within accepted limits|Time series|Quantity must equal or lower than the contracted quantity|
|Quantity can have 1 decimal|Time series|Quantity can contain maximum 1 decimal|
### Table of document attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the document in UUID form |
| revisionNumber | Always 1 |
| Type | A26 (CapacityDocument) |
| process.processType | A28 (Primary Reserve Process) |
| sender_MarketParticipant.mRID | Identification of the sender party |
| sender_MarketParticipant.marketRole.type | One of A46 (BSP) or A39 (Service Provider/Data Provider) | 
| receiver_MarketParticipant.mRID  | The TSO's EIC identification <br> Fingrid = **10X1001A1001A264** | 
| receiver_MarketParticipant.marketRole.type | A04 (System Operator) | 
| createdDateTime  | Date and time of document creation in UTC+0 <br> Format: YYYY-MM-DDTHH:MM:SSZ | 
| reserveBid_Period.timeInterval | Time period covered in the bid document <br> Format: YYYY-MM-DDTHH:MMZ <br> start and end time | 
| domain.mRID | EIC identification of the control area <br> For Finland **10YFI-1--------U** | 
| subject_MarketParticipant.mRID  | EIC Identification of the party responsible for the plan | 
| subject_MarketParticipant.marketRole.type | A46 (Balancing Service Provider) | 
|**Planned Resource Time Series**|
| mRID | Unique identification of the bid in UUID form |
| businessType | C26 - Frequency Containment Reserve Normal (FCR-N) or <br> C27 - Frequency Containment Reserve Disturbance (FCR-D) |
| flowDirection.direction | A01 – Up (FCR-D up) <br> A02 - Down (FCR-D down) <br> A03 – UP and DOWN (FCR-N) | 
| product | 8716867000016 – Active Power |
| connecting_Domain.mRID | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| resourceProvider_MarketParticipant.mRID  | EIC Identification of the party responsible for the plan | 
| marketAgreement.type | A04 (Yearly) |
| measurement_Unit.name | Always MAW (Megawatt) |
| standard_MarketProduct.marketProductType | Only for FCR-D: <br> Z02 - dynamic FCR-D <br> Z03 - static FCR-D | 
| **Series_Period: Exactly one per BidTimeSeries** |
| timeInterval | The time interval of the provided schedule. <br> Must be in UTC+0. Format: YYYY-MM-DDTHH:MMZ, start and end time | 
| Resolution | PT60M or PT1H | 
| **Point** |
| Position | Running number, typically from 1 to 24 | 
| quantity.quantity | Offered quantity in megawatts | 
### Example message
The example message is for a FCR-N planned resource document. 
```xml
<PlannedResourceSchedule_MarketDocument xmlns="urn:iec62325.351:tc57wg16:451-7:plannedresourcescheduledocument:6:3"> <!--PlannedResourceScheduleDocument schema version 6.3-->
	<mRID>96587f14-7082-4aad-9aa5-8cdc57355420</mRID>
	<revisionNumber>1</revisionNumber>
	<type>A26</type> <!--CapacityDocument-->
	<process.processType>A28</process.processType> <!--Primary Reserve Process-->
	<sender_MarketParticipant.mRID codingScheme="A01">---------------</sender_MarketParticipant.mRID> <!--Sender's ID-->
	<sender_MarketParticipant.marketRole.type>A46</sender_MarketParticipant.marketRole.type> <!--Type BSP-->
	<receiver_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</receiver_MarketParticipant.mRID> <!--Fingrid's ID-->
	<receiver_MarketParticipant.marketRole.type>A04</receiver_MarketParticipant.marketRole.type> <!--Type TSO-->
	<createdDateTime>2024-11-14T10:52:10Z</createdDateTime> <!--Timestamp in UTC+0-->
	<schedule_Period.timeInterval> <!--Start and beginning of the plan, a full CET day-->
		<start>2024-11-16T23:00Z</start>
		<end>2024-11-17T23:00Z</end>
	</schedule_Period.timeInterval>
	<domain.mRID codingScheme="A01">10YFI-1--------U</domain.mRID> <!--Finland's domain code-->
	<subject_MarketParticipant.mRID codingScheme="A01">----------------</subject_MarketParticipant.mRID> <!--Sender's ID-->
	<subject_MarketParticipant.marketRole.type>A46</subject_MarketParticipant.marketRole.type> <!--Type BSP-->
	<PlannedResource_TimeSeries>
		<mRID>b3b928d2-f3f1-4442-b46b-480b247a214cb</mRID>
		<businessType>C26</businessType> <!--FCR-N-->
		<flowDirection.direction>A03</flowDirection.direction> <!--Up and down for FCR-N-->
		<product>8716867000016</product> <!--Active Power-->
		<connecting_Domain.mRID codingScheme="A01">10YFI-1--------U</connecting_Domain.mRID> <!--Finland's domain code-->
		<resourceProvider_MarketParticipant.mRID codingScheme="A01">----------------</resourceProvider_MarketParticipant.mRID> <!--BSP's ID-->
		<marketAgreement.type>A04</marketAgreement.type> <!--Annual agreement-->
		<measurement_Unit.name>MAW</measurement_Unit.name>
		<Series_Period>
			<timeInterval>
				<start>2024-11-16T23:00Z</start> <!--Same time interval as the whole document, a whole CET day-->
				<end>2024-11-17T23:00Z</end>
			</timeInterval>
			<resolution>PT60M</resolution>
			<Point> <!--Provided capacity for each hour of the day-->
				<position>1</position>
				<quantity>10</quantity>
			</Point>
			<Point>
				<position>2</position>
				<quantity>11</quantity>
			</Point>
			<Point>
				<position>3</position>
				<quantity>12</quantity>
			</Point>
			<Point>
				<position>4</position>
				<quantity>13</quantity>
			</Point>
			<Point>
				<position>5</position>
				<quantity>14</quantity>
			</Point>
			<Point>
				<position>6</position>
				<quantity>15</quantity>
			</Point>
			<Point>
				<position>7</position>
				<quantity>16</quantity>
			</Point>
			<Point>
				<position>8</position>
				<quantity>17</quantity>
			</Point>
			<Point>
				<position>9</position>
				<quantity>18</quantity>
			</Point>
			<Point>
				<position>10</position>
				<quantity>19</quantity>
			</Point>
			<Point>
				<position>11</position>
				<quantity>20</quantity>
			</Point>
			<Point>
				<position>12</position>
				<quantity>21</quantity>
			</Point>
			<Point>
				<position>13</position>
				<quantity>22</quantity>
			</Point>
			<Point>
				<position>14</position>
				<quantity>23</quantity>
			</Point>
			<Point>
				<position>15</position>
				<quantity>24</quantity>
			</Point>
			<Point>
				<position>16</position>
				<quantity>25</quantity>
			</Point>
			<Point>
				<position>17</position>
				<quantity>26</quantity>
			</Point>
			<Point>
				<position>18</position>
				<quantity>27</quantity>
			</Point>
			<Point>
				<position>19</position>
				<quantity>28</quantity>
			</Point>
			<Point>
				<position>20</position>
				<quantity>29</quantity>
			</Point>
			<Point>
				<position>21</position>
				<quantity>30</quantity>
			</Point>
			<Point>
				<position>22</position>
				<quantity>31</quantity>
			</Point>
			<Point>
				<position>23</position>
				<quantity>32</quantity>
			</Point>
			<Point>
				<position>24</position>
				<quantity>33</quantity>
			</Point>
		</Series_Period>
	</PlannedResource_TimeSeries>
</PlannedResourceSchedule_MarketDocument>
```
