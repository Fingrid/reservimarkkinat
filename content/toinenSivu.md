
PowerPoint:
https://fingrid.sharepoint.com/:p:/r/sites/Kehittjportaali-o365/_layouts/15/Doc.aspx?sourcedoc=%7BBB45FFDD-43B8-442A-82AF-ACE5900EFB8B%7D&file=Kehitt%25u00e4j%25u00e4portaali_yleisesittely.pptx&wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&action=edit&mobileredirect=true

- [ ] Esitys Wikin alustavaihtoehdoista:
	- [ ] GH Pages (https://docs.github.com/en/pages)
	- [ ] GitBook (https://docs.gitbook.com/)
	- [ ] Confluence (https://confluence.atlassian.com/alldoc/atlassian-documentation-32243719.html)
	- [ ] Wiki.JS (https://js.wiki/)
	- [ ] Generaattorit + Azure Static Web APP (https://learn.microsoft.com/en-us/azure/static-web-apps/)
		- [ ] Next.JS (https://nextjs.org/)
		- [ ] Hugo (https://gohugo.io)
- [ ] Työmääräarvio
	- [x] Diagrammi: Komponentit ([[Excalidraw/ARCH_XML_Validation.excalidraw.md#^4XTeO2EdRHiGCLlI2_p4f|kehittäjäportaali_komponentit]])
	- [ ] Työtehtävät


# Työmääräarvio
![[Pasted image 20250116082613.png]]


**Infrastruktuuri, dev, (test) & prod: 10-15htp**
* Sidosrymät:
	* APLAT
	* APIM
	* Elisa
* Staattinen UI (Schema Validator)
	* AZ Static Web App 
	* FrontDoor + WAF
	* MS Entra
	* Git Repo
* Backend
	* AZ APIM
	* AZ Blob Storage
	* (AZ AI)
	* Git Repo
	* Networking (Kafka)
* Wiki
	* Site
	* Git Repo


**DevOps: 5-10htp**
* Sidosryhmät:
	* APLAT
	* Elisa
* Schema Validator ADO Pipeline / GH Action (dev + (test) + prod)
	* Test
	* Build & Deploy
* Site ADO Pipeline / GH Action (test + prod)


**Ohjelmistokehitys / MVP: 20-25htp**
* Sidosryhmät
	* Design
* Skeemavalidaattori (frontti)
	* React + TS
	* Skeemojen lähetys validoitavaksi (tiedosto, copy-paste)
	* Virheilmoitusten esittäminen käyttäjäystävällisesti
	
* Skeemavalidaattori (backend)
	* Flask + Python
	* XML Skeemojen validointi
	* Kutsujen välittäminen Kafkaan
	
* Wiki
	* Rakenne, pohjat, tyylit, käyttäjäanalytiikka (Plausible)


**Ohjelmistokehistys / Extra: 15-25htp**
* Skeemavalidaattori + Azure AI: 10-15htp
* Wiki + Validaattori -> SPA (esim. Next.JS): 5-10htp
	* Wikin ja Validaattorin integroiminen samalle sivustolle
	* Sivusto autentikoinnin taakse
