

export function TechnicalOverview() {
    return (
      <section className="mt-12 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">How it works</h2>
        <p className="text-gray-700">
          The search functionality is implemented using a server action, which searches an array of pre-populated user data. The AsyncSelect component sends the search query to the server action, which filters the users based on a <code>startsWith</code> matching logic. When a user is selected from the dropdown, their details are displayed in a card component.
        </p>
      </section>
    )
  }