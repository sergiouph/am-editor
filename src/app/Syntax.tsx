import React, { useEffect, useState } from 'react';

export const Syntax = () => {
  return (
    <div className='syntax'>
      <h1>Transitions</h1>
      <p>
        The most simple transition can be declared using:
      </p>
      <pre className='code-sample'>
        source -&gt; target
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
        source -&gt; target : symbol
      </pre>
      <p>
        If the arrow <code>-&gt;</code> is changed by <code>=&gt;</code> it will mark
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
        -&gt; states
      </pre>
      <p>
        For initial and accepted states use:
      </p>
      <pre className='code-sample'>
        =&gt; states
      </pre>
      <p>
        Only for accepted states use:
      </p>
      <pre className='code-sample'>
        states &lt;=
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
        Transitions declarations support actions by appending this syntax:
      </p>
      <pre className='code-sample'>
        source -&gt; target ! action<br/>
        source -&gt; target !&lt; action<br/>
        source -&gt; target !&gt; action<br/>
      </pre>
      <p>
        The <code>!</code> and <code>!&lt;</code> actions are
        rendered <em>before</em> consuming the symbol
        and <code>!&gt;</code> <em>after</em> the symbol.
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
