# Election Helpers

## Read [docs.md](https://github.com/ejfox/election-helpers/blob/master/docs.md) or [GH pages](https://ejfox.github.io/election-helpers/global.html) for documentation 

![npm](https://img.shields.io/npm/v/election-helpers?color=%235B70D9) 

[View on NPM](https://www.npmjs.com/package/election-helpers)

--
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

<a name="stateNameHash"></a>

## stateNameHash ⇒ <code>string</code>

**Example**  
```js
stateNameHash['01']
// returns 'Alabama'
```
<a name="getStateFipsFromStateAbbr"></a>

## getStateFipsFromStateAbbr(stateAbbr) ⇒ <code>string</code>

**Example**  
```js
getStateFipsFromStateAbbr('CA')
// => '06'
getStateFipsFromStateAbbr('NY')
// => '36'
```
<a name="stateAbbrToName"></a>

## stateAbbrToName(stateAbbr) ⇒ <code>string</code>

**Example**  
```js
getStateNameFromStateAbbr('AL')
// returns 'Alabama'
```
<a name="getStateAbbrFromStateFips"></a>

## getStateAbbrFromStateFips(stateFips) ⇒ <code>string</code>

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

**Example**  
```js
getPercentageOfVotes(100, 200)
// returns 50
```
<a name="sortCandidatesByVotes"></a>

## sortCandidatesByVotes(candidates, sortFunction) ⇒ <code>Array</code>

<a name="stateFipsToName"></a>

## stateFipsToName(stateFips) ⇒ <code>string</code>
**Example**  
```js
stateFipsToName('01')
// returns 'Alabama'
```
<a name="stateAbbrToFips"></a>

## stateAbbrToFips(stateAbbreviation) ⇒ <code>string</code>

**Example**  
```js
getStateFipsFromAbbreviation('NY')
// returns '36'
```
<a name="stateNameToFips"></a>

## stateNameToFips(stateName) ⇒ <code>string</code>

**Example**  
```js
getStateFipsFromStateName('Alabama')
// returns '01'
```
<a name="boundariesAvailableForRaceType"></a>

## boundariesAvailableForRaceType(raceType) ⇒ <code>array</code>
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
