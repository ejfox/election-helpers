## Constants

<dl>
<dt><a href="#stateNameHash">stateNameHash</a> ⇒ <code>string</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getStateFipsFromStateAbbr">getStateFipsFromStateAbbr(stateAbbr)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#stateAbbrToName">stateAbbrToName(stateAbbr)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#getStateAbbrFromStateFips">getStateAbbrFromStateFips(stateFips)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#getStateCodeFromCountyFips">getStateCodeFromCountyFips(countyFips)</a> ⇒ <code>string</code></dt>
<dd><p>Get the state code from the county fips string</p>
</dd>
<dt><a href="#candidateVotePercentage">candidateVotePercentage(candidateVote, totalVotes)</a> ⇒ <code>string</code></dt>
<dd><p>Given the absolute number of votes a candidate has received, and the total number of votes in the election, returns the percentage of votes the candidate has received.</p>
</dd>
<dt><a href="#stateFipsToName">stateFipsToName(stateFips)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#stateAbbrToFips">stateAbbrToFips(stateAbbr)</a> ⇒ <code>string</code></dt>
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
<dt><a href="#Candidate">Candidate</a> ⇒ <code><a href="#Candidate">Array.&lt;Candidate&gt;</a></code></dt>
<dd><p>Sort an array of candidate objects by vote count.</p>
<p>Each candidate <strong>must</strong> contain a <code>candidatevotes</code> property that can be coerced
to a number. Any extra properties are preserved.</p>
<p>By default the list is sorted descending (highest → lowest).  Pass a custom
<code>sortFunction</code> if you need a different order – its contract is identical to
<code>Array.prototype.sort</code>.</p>
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
<a name="getStateFipsFromStateAbbr"></a>

## getStateFipsFromStateAbbr(stateAbbr) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - - The fips code for the state  

| Param | Type |
| --- | --- |
| stateAbbr | <code>string</code> | 

**Example**  
```js
getStateFipsFromStateAbbr('CA')
// => '06'
getStateFipsFromStateAbbr('NY')
// => '36'
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

## candidateVotePercentage(candidateVote, totalVotes) ⇒ <code>string</code>
Given the absolute number of votes a candidate has received, and the total number of votes in the election, returns the percentage of votes the candidate has received.

**Kind**: global function  
**Returns**: <code>string</code> - - The percentage of votes the candidate has received, formatted to one decimal place.  

| Param | Type | Description |
| --- | --- | --- |
| candidateVote | <code>number</code> | The number of votes the candidate has received. |
| totalVotes | <code>number</code> | The total number of votes in the election. |

**Example**  
```js
candidateVotePercentage(100, 200)
// returns '50.0'
```
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

## stateAbbrToFips(stateAbbr) ⇒ <code>string</code>
Get the state fips code from the abbreviation, like 'NY' to '36'

**Kind**: global function  
**Returns**: <code>string</code> - - The state fips code.  

| Param | Type | Description |
| --- | --- | --- |
| stateAbbr | <code>string</code> | The state abbreviation. |

**Example**  
```js
stateAbbrToFips('NY')
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
<a name="Candidate"></a>

## Candidate ⇒ [<code>Array.&lt;Candidate&gt;</code>](#Candidate)
Sort an array of candidate objects by vote count.

Each candidate **must** contain a `candidatevotes` property that can be coerced
to a number. Any extra properties are preserved.

By default the list is sorted descending (highest → lowest).  Pass a custom
`sortFunction` if you need a different order – its contract is identical to
`Array.prototype.sort`.

**Kind**: global typedef  
**Returns**: [<code>Array.&lt;Candidate&gt;</code>](#Candidate) - The **same** array instance, ordered according to the
compare logic.  
**Throws**:

- <code>TypeError</code> If `raceCandidateArray` is not a valid array.


| Param | Type | Description |
| --- | --- | --- |
| raceCandidateArray | [<code>Array.&lt;Candidate&gt;</code>](#Candidate) | – Candidates to sort (mutated in-place). |
| [sortFunction] | <code>function</code> | – Optional compare function.  Defaults to `(a, b) => b - a` for descending order. |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| candidatevotes | <code>number</code> \| <code>string</code> | – Vote total for the candidate. |
| [*] | <code>any</code> | – Additional properties are allowed and untouched. |

**Example**  
```js
// Default (descending)
sortCandidatesByVotes(candidates)
```
**Example**  
```js
// Ascending order
sortCandidatesByVotes(candidates, (a, b) => a - b)
```
**Example**  
```js
// Custom tie-breaker: descending votes then alphabetical by name
sortCandidatesByVotes(candidates, (a, b) => {
  const diff = b - a
  return diff !== 0 ? diff : a.name.localeCompare(b.name)
})
```
