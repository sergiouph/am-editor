import React, { useEffect, useState } from 'react';

export const Syntax = () => {
  return (
    <div className='syntax'>
      <h1>Transitions</h1>
      <p>
        The most simple transition can be declared using:
      </p>
      <pre className='code-sample'>
        source -> target
      </pre>
      <p>
        This will create a transition from 
        the <code>source</code> states 
        to the <code>target</code> states without consuming any symbol, 
        in other words it will create an &epsilon;-transition.
      </p>
      <p>
        Multiple states can be specified if they are separated by commas.
      </p>
      <p>
        Transitions consuming symbols are declared using this syntax:
      </p>
      <pre className='code-sample'>
        source -> target : symbol
      </pre>
      <p>
        If the arrow <code>-></code> is changed by <code>=></code> it will mark
        the <code>target</code> states as accepted.
      </p>
      <p>
        Separating multiple symbols using commas is supported as well (special
        symbols like commas can be escaped by putting a <code>\</code> before). 
      </p>

      <h1>States</h1>
      <p>
        Transitions implicitly create states, however, explicitly declaring them
        allows to add more information.
      </p>
      <p>
        For declaring initial states use:
      </p>
      <pre className='code-sample'>
        -> states
      </pre>
      <p>
        And for accepted states use:
      </p>
      <pre className='code-sample'>
        => states
      </pre>
      <p>
        The text used to represent the state in the diagram can be changed by
        using following syntax:
      </p>
      <pre className='code-sample'>
        states : label
      </pre>
      <p>
        Previous example will use <code>label</code> for rendering the states in
        the diagram, however that label cannot be used for referencing
        the states in the code.
      </p>
      <p>
        For only declaring the states without adding extra information use 
        following syntax:
      </p>
      <pre className='code-sample'>
        states
      </pre>
      <p>
        Multiple states can be used for a single declaration if they are separated
        by a comma.
      </p>

      <h1>Actions</h1>
      <p>
        Actions are not part of the automata theory but they help to illustrate 
        triggered actions when transitioning between states.
      </p>
      <p>
        Both transition and state declarations support actions by appending
        the action after the declaration using this syntax:
      </p>
      <pre className='code-sample'>
        source -> target ! action<br/>
        states ! action
      </pre>
      <p>
        Actions in states are rendered <em>before</em> reaching the state and
        actions in transitions <em>after</em> the symbol is consumed.
      </p>

      <h1>Directives</h1>
      <p>
        Directives are used for changing meta-information and settings of the
        editing automaton. Supported directives:
      </p>
      <ul>
        <li><code>@title</code> must be followed by the title of the automaton.</li>
      </ul>
    </div>
  )
}
