import { describe, it, expect } from 'vitest';
import { nameCase, commonName, surnameOf, countyEquivalentLabel } from '../index.js';

describe('nameCase', () => {
  it('sets all-caps names in name case with suffixes last', () => {
    expect(nameCase('JOSEPH R JR BIDEN')).toBe('Joseph R. Biden Jr.');
    expect(nameCase('BARACK HUSSEIN OBAMA II')).toBe('Barack Hussein Obama II');
    expect(nameCase("BETO O'ROURKE")).toBe("Beto O'Rourke");
    expect(nameCase('JOHN MCCAIN')).toBe('John McCain');
    expect(nameCase('ALEXANDRIA OCASIO-CORTEZ')).toBe('Alexandria Ocasio-Cortez');
  });
  it('leaves mixed-case names exactly as shipped', () => {
    expect(nameCase('Kamala Harris')).toBe('Kamala Harris');
    expect(nameCase('')).toBe('');
  });
});

describe('commonName', () => {
  it('uses the name a candidate went by', () => {
    expect(commonName('JOSEPH R JR BIDEN')).toBe('Joe Biden');
    expect(commonName('Hillary Diane Rodham Clinton')).toBe('Hillary Clinton');
    expect(commonName('Donald John Trump')).toBe('Donald Trump');
    expect(commonName('ALBERT ARNOLD GORE JR')).toBe('Al Gore');
  });
  it('falls back to first and last names', () => {
    expect(commonName('CHARLES W BABBAGE')).toBe('Charles Babbage');
    expect(commonName('Kamala Harris')).toBe('Kamala Harris');
  });
  it('passes party labels and catch-alls through', () => {
    expect(commonName('Democratic')).toBe('Democratic');
    expect(commonName('All other candidates, write-ins and scattering')).toBe('All other candidates, write-ins and scattering');
  });
});

describe('surnameOf', () => {
  it('is the surname without suffixes', () => {
    expect(surnameOf('JOSEPH R JR BIDEN')).toBe('Biden');
    expect(surnameOf('Kamala Harris')).toBe('Harris');
  });

  it('drops an undotted suffix in a mixed-case name', () => {
    expect(surnameOf('Robert Reid Jr')).toBe('Reid');
    expect(surnameOf('Joseph R Jr Biden')).toBe('Biden');
    expect(commonName('Robert Reid Jr')).toBe('Robert Reid Jr');
  });
});

describe('countyEquivalentLabel', () => {
  it('names county-equivalents unambiguously', () => {
    expect(countyEquivalentLabel('51760', 'Richmond')).toBe('Richmond city');
    expect(countyEquivalentLabel('51159', 'Richmond')).toBe('Richmond County');
    expect(countyEquivalentLabel('24510', 'Baltimore')).toBe('Baltimore city');
    expect(countyEquivalentLabel('22071', 'Orleans')).toBe('Orleans Parish');
    expect(countyEquivalentLabel('09110', 'Capitol')).toBe('Capitol Planning Region');
    expect(countyEquivalentLabel('02013', 'Aleutians East')).toBe('Aleutians East');
    expect(countyEquivalentLabel('42101', 'Philadelphia')).toBe('Philadelphia County');
  });
  it('keeps names that already carry their type', () => {
    expect(countyEquivalentLabel('32510', 'Carson City')).toBe('Carson City');
  });
});
