+++
categories = ['Site-update']
date = "2015-07-06"
tags = ['vakantie','api','code']
title = "Kijkje in de keuken"

+++

Vandaag een kijkje in de keuken van De Digitale Topschool

De Digitale Topschool is gemaakt in de programmeertaal Ruby. Het is een moderne taal die heel geschikt is om interactieve websites mee te maken. Eén van de dingen die je er goed mee kan is aanhaken op andere websites.

Zo'n andere website is de landelijke vakantiegegevens die de Nederlandse overheid beschikbaar stelt. Naast de website waar de vakanties op staan, is er ook een zogeheten XML bestand. Dit is makkelijk door computers te lezen. Dit XML bestand heb ik gebruikt om aan te sluiten met de landelijke vakanties.

Het ging als volgt:

Om te beginnen bekeek ik de XML op mijn computer. Het is nogal groot maar waar het om gaat is dit:

``` xml
<vacations>
 <vacation>
   <type><![CDATA[Herfstvakantie]]></type>
   <compulsorydates>false</compulsorydates>
   <regions>
     <region>noord</region>
     <startdate>2014-10-10T22:00:00.000Z</startdate>
     <enddate>2014-10-19T21:59:00.000Z</enddate>
   </regions>
   <regions>
     <region>midden</region>
     <startdate>2014-10-17T22:00:00.000Z</startdate>
     <enddate>2014-10-26T22:59:00.000Z</enddate>
   </regions>
   <regions>
     <region>zuid</region>
     <startdate>2014-10-17T22:00:00.000Z</startdate>
     <enddate>2014-10-26T22:59:00.000Z</enddate>
   </regions>
 </vacation>
</vacations>
```

Wie al een beetje HTML begrijpt, snapt waarschijnlijk al dat XML net zoiets is maar dan bedoeld voor computers en niet voor mensen. Handig! Hierdoor kan ik de officiële lijst gebruiken binnen De Digitale Topschool.

De rest van dit bericht wordt héél technisch, dus wees gewaarschuwd. :)

Om de vakanties binnen onze eigen website te gebruiken hebben we een computerbestand nodig dat een model heet. Het heeft weinig te maken met menselijke topmodellen. Een model is een soort opbergkast in de computer. We kunnen er dingen in stoppen en weer uit halen. Perfect voor de vakanties.

Elk model kun je vergelijken met een map in een kast. Elke map heeft weer verschillende losse bladen. In ons geval zou je een map ‘Zomervakantie 2015' kunnen bedenken en die heeft de bladen begintijd, eindtijd. Er zijn aparte bladen voor elke regio in Nederland, dus noord, midden en zuid.

In computercode ziet dat er ongeveer als volgt uit:

``` ruby
class Vacation
 field :name
 field :compulsory
 field :region
 field :startdate
 field :enddate
end
```

Je ziet dus al dat we de vakantie uit de XML hebben platgeslagen en het nu een model binnen onze eigen website is geworden.

Waarom platgeslagen? De XML heeft meer structuur dan het model. Dat klopt. Ik vond de structuur in de XML niet zo belangrijk dat ik die wilde houden. Voor scholen is het begin, einde en de regio erg belangrijk. Dat betekent dat voor De Digitale Topschool deze drie dingen op het bovenste niveau moeten liggen.

Anyway, we hebben de XML en we hebben het model. Nu hebben we een computerprogramma nodig dat deze twee dingen aan elkaar knoopt. Dit is een ander programma dat we eens per maand aanzetten om de XML te bekijken en daarvan modellen aan te maken.

Hoe het er precies uitziet is nu niet zo belangrijk, maar het is ook weer een class:

``` ruby
class VacationImporter
 URL = “http://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays”
 def import
   @doc = Nokogiri::XML(open(URL)) do |config|
     config.nonet
   end
 end
end
```

Je ziet hier twee dingen.

De eerste is duidelijk een URL. Dit is een plek waar we het URL van de vakantiegegevens kunnen vinden. We schrijven het in hoofdletters. Dit betekent dat we dit als een constant ding zien. Het URL zal heel zelden veranderen. Het is dus een constant gegeven en in Ruby moet je dat in hoofdletters schrijven.

Het tweede is al ingewikkelder. Dit is iets dat een methode heet. Een methode is computertaal voor actie. De methode doet dus dingen voor ons. In dit geval gaat de methode import naar het URL toe: het wordt geopend. Het geopende URL stoppen we in een apart bakje. Het bakje hebben we @doc genoemd.

Wat hier dus gebeurt is dat de XML wordt bekeken en in het bakje @doc komt. Het bakje kunnen we daarna weer gebruiken om onze eigen modellen mee te maken.

Het eigenlijke aanmaken is een heel geneuzel, maar de kern van de zaak is:

``` ruby
def create_vacation(node, region, starttime, endtime)
 vacation = Vacation.find_or_initialize_by({
   schoolyear: node.at_xpath(’../../schoolyear’).content,
   type:       node.at_xpath(’./type’).content,
   region:     region
 })
end
```

Hier zie je dat we voor elke `<vacation>` uit de XML een Vacation aanmaken in De Digitale Topschool. Hierdoor weet onze website wanneer het vakantie is.

#### Waarom is dat nou belangrijk?

Twee redenen:

1. Tijdens de zomervakantie is De Digitale Topschool dicht. Het klinkt misschien
flauw maar om goed te kunnen leren, moet je ook ontspannen. De zomervakantie is erg belangrijk om je hersenen rust te geven. Ze kunnen daarna weer met volle kracht werken.
1. Tijdens andere vakanties kunnen we nu de herinnermails uitzetten. Dit zijn mailtjes als je al een tijd niet aan een opdracht hebt gewerkt. Maar tijdens bijvoorbeeld de kerstvakantie heb je wel wat beters te doen.

Op deze manier laat De Digitale Topschool je tijdens vakanties gewoon met rust. En omdat de school aan de goede regio is gekoppeld, werkt het voor iedereen automatisch op de goede tijden.

Bonusvraag. Er is een school in Nederland die geen zomervakantie heeft. Deze school is in principe het hele jaar geopend. Wat doen we daarmee dan?

Deze school kan de regio leeglaten. Geen regio betekent dat De Digitale Topschool niet weet waneeer de vakantie is voor die school.
