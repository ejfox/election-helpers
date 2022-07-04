## Constants

<dl>
<dt><a href="#stateNameHash">stateNameHash</a> ⇒ <code>string</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
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
<dt><a href="#stateNameToFips">stateNameToFips(stateName)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#stateAbbrToName">stateAbbrToName(stateAbbr)</a> ⇒ <code>string</code></dt>
<dd></dd>
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
getStateNameFromStateFips('01')
// returns 'Alabama'
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
