# Election Helpers

## Read [docs.md](https://github.com/ejfox/election-helpers/blob/master/docs.md) or [GH pages](https://ejfox.github.io/election-helpers/global.html) for documentation 

![npm](https://img.shields.io/npm/v/election-helpers?color=%235B70D9) 

[View on NPM](https://www.npmjs.com/package/election-helpers)

--
## Constants

<dl>
<dt><a href="#stateNameHash">stateNameHash</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#usBounds">usBounds</a> : <code><a href="#USBounds">USBounds</a></code></dt>
<dd><p>The bounds of the United States.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#partyNameNormalizer">partyNameNormalizer(partyNameString)</a> ⇒ <code>string</code></dt>
<dd><p>Normalizes a party name string to a standardized format.</p>
</dd>
<dt><a href="#stateAbbrToName">stateAbbrToName(stateAbbr)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#getStateAbbrFromStateFips">getStateAbbrFromStateFips(stateFips)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#getStateCodeFromCountyFips">getStateCodeFromCountyFips(countyFips)</a> ⇒ <code>string</code></dt>
<dd><p>Get the state code from the county fips string</p>
</dd>
<dt><a href="#candidateVotePercentage">candidateVotePercentage(candidateVote, totalVotes)</a> ⇒ <code>number</code></dt>
<dd><p>Given the absolute number of votes a candidate has received, and the total number of votes in the election, returns the percentage of votes the candidate has received.</p>
</dd>
<dt><a href="#sortCandidatesByVotes">sortCandidatesByVotes(candidates, sortFunction)</a> ⇒ <code>Array</code></dt>
<dd><p>Given an array of candidate objects, returns a sorted array of candidate objects, sorted by the number of votes they have received with the specified sort function.</p>
</dd>
<dt><a href="#stateFipsToName">stateFipsToName(stateFips)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#stateAbbrToFips">stateAbbrToFips(stateAbbreviation)</a> ⇒ <code>string</code></dt>
<dd><p>Get the state fips code from the abbreviation, like &#39;NY&#39; to &#39;36&#39;</p>
</dd>
<dt><a href="#stateNameToFips">stateNameToFips(stateName)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#boundariesAvailableForRaceType">boundariesAvailableForRaceType(raceType)</a> ⇒ <code>array</code></dt>
<dd></dd>
<dt><a href="#isBoundaryAvailableForRaceType">isBoundaryAvailableForRaceType(raceType, boundaryType)</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#USBounds">USBounds</a> : <code>Object</code></dt>
<dd><p>Represents the bounds of the United States.</p>
</dd>
<dt><a href="#StatePlaneProjections">StatePlaneProjections</a> : <code>Object</code></dt>
<dd><p>Represents the state planes and bounds for every state.</p>
</dd>
<dt><a href="#County">County</a> : <code>Object</code></dt>
<dd><p>An array of county names with their corresponding FIPS codes.</p>
</dd>
</dl>

<a name="stateNameHash"></a>

## stateNameHash ⇒ <code>string</code>
**Kind**: global constant  
**Returns**: <code>string</code> - - The state name  
**Throws**:

- <code>Error</code> - If the state fips code is invalid.


| Param | Type | Description |
| --- | --- | --- |
| stateFips | <code>string</code> | The state fips code. |

**Example**  
```js
stateNameHash['01']
// returns 'Alabama'
```
<a name="usBounds"></a>

## usBounds : [<code>USBounds</code>](#USBounds)
The bounds of the United States.

**Kind**: global constant  
<a name="partyNameNormalizer"></a>

## partyNameNormalizer(partyNameString) ⇒ <code>string</code>
Normalizes a party name string to a standardized format.

**Kind**: global function  
**Returns**: <code>string</code> - The normalized party name.  

| Param | Type | Description |
| --- | --- | --- |
| partyNameString | <code>string</code> | The party name string to be normalized. |

**Example**  
```js
const partyName = partyNameNormalizer('R') // returns 'rep'
const partyName = partyNameNormalizer('REP') // returns 'rep'
const partyName = partyNameNormalizer('Republican') // returns 'rep'
const partyName = partyNameNormalizer('republican') // returns 'rep'
```
<a name="stateAbbrToName"></a>

## stateAbbrToName(stateAbbr) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - - The state name  
**Throws**:

- <code>Error</code> - If the state abbreviation is invalid.


| Param | Type | Description |
| --- | --- | --- |
| stateAbbr | <code>string</code> | Two letter state abbreviation |

**Example**  
```js
getStateNameFromStateAbbr('AL')
// returns 'Alabama'
```
<a name="getStateAbbrFromStateFips"></a>

## getStateAbbrFromStateFips(stateFips) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - - The state abbreviation  
**Throws**:

- <code>Error</code> - If the state fips code is invalid.


| Param | Type | Description |
| --- | --- | --- |
| stateFips | <code>string</code> | The state fips code. |

**Example**  
```js
getStateAbbrFromStateFips('01')
// returns 'AL'
```
**Example**  
```js
getStateAbbrFromStateFips('36')
// returns 'NY'
```
**Example**  
```js
getStateAbbrFromStateFips('XX')
// throws an error
```
<a name="getStateCodeFromCountyFips"></a>

## getStateCodeFromCountyFips(countyFips) ⇒ <code>string</code>
Get the state code from the county fips string

**Kind**: global function  
**Returns**: <code>string</code> - - The state fips code.  

| Param | Type | Description |
| --- | --- | --- |
| countyFips | <code>string</code> | The county fips code. |

**Example**  
```js
getStateCodeFromCountyFips('01001')
// returns '01'
```
**Example**  
```js
getStateCodeFromCountyFips(01000)
// throws Error
```
**Example**  
```js
getStateCodeFromCountyFips('01')
// throws Error
```
<a name="candidateVotePercentage"></a>

## candidateVotePercentage(candidateVote, totalVotes) ⇒ <code>number</code>
Given the absolute number of votes a candidate has received, and the total number of votes in the election, returns the percentage of votes the candidate has received.

**Kind**: global function  
**Returns**: <code>number</code> - - The percentage of votes the candidate has received.  

| Param | Type | Description |
| --- | --- | --- |
| candidateVote | <code>number</code> | The number of votes the candidate has received. |
| totalVotes | <code>number</code> | The total number of votes in the election. |

**Example**  
```js
getPercentageOfVotes(100, 200)
// returns 50
```
<a name="sortCandidatesByVotes"></a>

## sortCandidatesByVotes(candidates, sortFunction) ⇒ <code>Array</code>
Given an array of candidate objects, returns a sorted array of candidate objects, sorted by the number of votes they have received with the specified sort function.

**Kind**: global function  
**Returns**: <code>Array</code> - - A sorted array of candidate objects.  
**Throws**:

- <code>Error</code> - If the candidates array is invalid.


| Param | Type | Description |
| --- | --- | --- |
| candidates | <code>Array</code> | An array of candidate objects. |
| sortFunction | <code>function</code> | The function to use to sort the candidates (like d3.descending) |

<a name="stateFipsToName"></a>

## stateFipsToName(stateFips) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - - The state name  
**Throws**:

- <code>Error</code> - If the state fips code is invalid.


| Param | Type |
| --- | --- |
| stateFips | <code>string</code> | 

**Example**  
```js
stateFipsToName('01')
// returns 'Alabama'
```
<a name="stateAbbrToFips"></a>

## stateAbbrToFips(stateAbbreviation) ⇒ <code>string</code>
Get the state fips code from the abbreviation, like 'NY' to '36'

**Kind**: global function  
**Returns**: <code>string</code> - - The state fips code.  

| Param | Type | Description |
| --- | --- | --- |
| stateAbbreviation | <code>string</code> | The state abbreviation. |

**Example**  
```js
getStateFipsFromAbbreviation('NY')
// returns '36'
```
<a name="stateNameToFips"></a>

## stateNameToFips(stateName) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - - The state fips code  
**Throws**:

- <code>Error</code> - If the state name is invalid.


| Param | Type |
| --- | --- |
| stateName | <code>string</code> | 

**Example**  
```js
getStateFipsFromStateName('Alabama')
// returns '01'
```
<a name="boundariesAvailableForRaceType"></a>

## boundariesAvailableForRaceType(raceType) ⇒ <code>array</code>
**Kind**: global function  
**Returns**: <code>array</code> - - An array of the available district types  

| Param | Type |
| --- | --- |
| raceType | <code>string</code> | 

**Example**  
```js
boundariesAvailableForRaceType('president')
// returns ['state', 'county']
```
**Example**  
```js
boundariesAvailableForRaceType('senate')
// returns ['state']
```
**Example**  
```js
boundariesAvailableForRaceType('house')
// returns ['district']
```
**Example**  
```js
boundariesAvailableForRaceType(2016)
// returns null
```
<a name="isBoundaryAvailableForRaceType"></a>

## isBoundaryAvailableForRaceType(raceType, boundaryType)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| raceType | <code>string</code> | The race type, like 'president', 'house', or 'senate' |
| boundaryType | <code>string</code> | The type of boundary, like 'county', 'state', or 'district' |

**Example**  
```js
isBoundaryAvailableForRaceType('president', 'county')
// returns true
```
**Example**  
```js
isBoundaryAvailableForRaceType('president', 'state')
// returns true
```
**Example**  
```js
isBoundaryAvailableForRaceType('president', 'district')
// returns false
```
<a name="USBounds"></a>

## USBounds : <code>Object</code>
Represents the bounds of the United States.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the feature collection. |
| features | <code>Array.&lt;Object&gt;</code> | The features of the collection. |

<a name="StatePlaneProjections"></a>

## StatePlaneProjections : <code>Object</code>
Represents the state planes and bounds for every state.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| proj | <code>string</code> | The projection |
| rotate | <code>Array.&lt;number&gt;</code> | The rotation of the projection. |
| bounds | <code>Array.&lt;number&gt;</code> | The bounds of the projection. |
| parallels | <code>Array.&lt;number&gt;</code> | The parallels of the projection. |

<a name="County"></a>

## County : <code>Object</code>
An array of county names with their corresponding FIPS codes.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| fips_code | <code>number</code> | The FIPS code of the county. |
| name | <code>string</code> | The name of the county. |

