import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import HomeScreen from '../app/(tabs)/explore'

const mockProperties = [
  { id: '1', address: '123 Main St', price: '$150k' },
  { id: '2', address: '456 Oak Ave', price: '$200k' }
]

jest.mock('../context/PropertyContext', () => ({
  usePropertyContext: () => ({
    properties: mockProperties,
    savedProperties: []
  })
}))

describe('HomeScreen', () => {
  it('1.a - renders property list', () => {
    const { getByText } = render(<HomeScreen />)
    expect(getByText('123 Main St')).toBeTruthy()
    expect(getByText('456 Oak Ave')).toBeTruthy()
  })

  it('1.b - filters properties on search', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<HomeScreen />)
    const searchInput = getByPlaceholderText('Search properties...')
    
    fireEvent.changeText(searchInput, 'Main')
    
    expect(getByText('123 Main St')).toBeTruthy()
    expect(queryByText('456 Oak Ave')).toBeNull()
  })
})