import React, { useState } from 'react';

interface LearnPageProps {
  onBack: () => void;
}

type TabType = 'sensory' | 'adhd' | 'strategies' | 'resources';

const TabButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-t-lg transition-all duration-300 text-sm md:text-base
                ${isActive
                  ? 'bg-cyan-900/50 text-yellow-300 neon-border border-b-0'
                  : 'bg-black/30 text-cyan-400 hover:text-cyan-300'}`}
  >
    {label}
  </button>
);

const InfoCard: React.FC<{
  title: string;
  children: React.ReactNode;
  icon?: string;
}> = ({ title, children, icon }) => (
  <div className="ui-panel p-4 rounded-lg mb-4">
    <div className="ui-corner top-left"></div>
    <div className="ui-corner top-right"></div>
    <div className="ui-corner bottom-left"></div>
    <div className="ui-corner bottom-right"></div>
    <h3 className="text-lg font-bold text-pink-400 mb-2 flex items-center gap-2">
      {icon && <span>{icon}</span>}
      {title}
    </h3>
    <div className="text-cyan-200">{children}</div>
  </div>
);

const LearnPage: React.FC<LearnPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('sensory');

  const renderSensoryContent = () => (
    <div className="space-y-4">
      <InfoCard title="What is Sensory Processing?" icon="🧠">
        <p className="mb-3">
          Sensory processing is how our brain receives, organizes, and responds to information from our senses.
          Everyone processes sensory information differently - there's no "right" way!
        </p>
        <p>
          When someone has difficulty processing sensory information, it can affect daily activities,
          learning, and emotional regulation.
        </p>
      </InfoCard>

      <InfoCard title="The 8 Sensory Systems" icon="✨">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Visual:</span> How we see and process light, colors, movement
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Auditory:</span> How we hear and process sounds
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Tactile:</span> How we feel touch, textures, temperature
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Gustatory:</span> How we taste foods and textures
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Olfactory:</span> How we smell and react to scents
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Vestibular:</span> Our sense of balance and movement
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Proprioceptive:</span> Body awareness and muscle control
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Interoceptive:</span> Internal signals (hunger, emotions)
          </div>
        </div>
      </InfoCard>

      <InfoCard title="Sensory Processing Differences" icon="🎭">
        <div className="space-y-3">
          <div className="p-3 bg-pink-900/30 rounded border border-pink-400/30">
            <h4 className="text-pink-400 font-bold mb-1">Over-Responsive (Hypersensitive)</h4>
            <p className="text-sm">
              Feels sensory input more intensely. May avoid certain textures, sounds, or lights.
              Tags in clothing might feel unbearable, or background noise might be overwhelming.
            </p>
          </div>
          <div className="p-3 bg-cyan-900/30 rounded border border-cyan-400/30">
            <h4 className="text-cyan-400 font-bold mb-1">Under-Responsive (Hyposensitive)</h4>
            <p className="text-sm">
              Needs more sensory input to register. May seek intense flavors, deep pressure,
              or lots of movement. Might not notice temperature changes or pain as quickly.
            </p>
          </div>
          <div className="p-3 bg-yellow-900/30 rounded border border-yellow-400/30">
            <h4 className="text-yellow-400 font-bold mb-1">Sensory Seeking</h4>
            <p className="text-sm">
              Actively craves certain sensory experiences. Might love spinning, jumping,
              strong flavors, or squeezing things tightly.
            </p>
          </div>
        </div>
      </InfoCard>

      <InfoCard title="SPD (Sensory Processing Disorder)" icon="📋">
        <p className="mb-2">
          When sensory processing differences significantly impact daily life, it may be called
          Sensory Processing Disorder (SPD). Signs can include:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Extreme reactions to textures, sounds, or lights</li>
          <li>Difficulty with transitions or changes in routine</li>
          <li>Challenges with motor coordination</li>
          <li>Meltdowns that seem "out of proportion"</li>
          <li>Difficulty focusing in stimulating environments</li>
          <li>Unusual eating habits related to texture or taste</li>
        </ul>
      </InfoCard>
    </div>
  );

  const renderADHDContent = () => (
    <div className="space-y-4">
      <InfoCard title="Understanding ADHD" icon="🎯">
        <p className="mb-3">
          ADHD (Attention-Deficit/Hyperactivity Disorder) is a neurodevelopmental condition
          that affects how the brain regulates attention, impulses, and activity levels.
        </p>
        <p>
          It's not about being lazy or not trying hard enough - ADHD brains are wired differently,
          with differences in dopamine regulation and executive function.
        </p>
      </InfoCard>

      <InfoCard title="The Three Types of ADHD" icon="🔄">
        <div className="space-y-3">
          <div className="p-3 bg-pink-900/30 rounded border border-pink-400/30">
            <h4 className="text-pink-400 font-bold mb-1">Predominantly Inattentive</h4>
            <p className="text-sm">
              Difficulty sustaining attention, easily distracted, forgetful in daily activities,
              trouble organizing tasks. Often called "daydreaming" type.
            </p>
          </div>
          <div className="p-3 bg-cyan-900/30 rounded border border-cyan-400/30">
            <h4 className="text-cyan-400 font-bold mb-1">Predominantly Hyperactive-Impulsive</h4>
            <p className="text-sm">
              Fidgeting, difficulty staying seated, talks excessively, interrupts others,
              difficulty waiting turn. High energy that's hard to regulate.
            </p>
          </div>
          <div className="p-3 bg-yellow-900/30 rounded border border-yellow-400/30">
            <h4 className="text-yellow-400 font-bold mb-1">Combined Type</h4>
            <p className="text-sm">
              Shows significant symptoms of both inattention and hyperactivity-impulsivity.
              The most common type of ADHD.
            </p>
          </div>
        </div>
      </InfoCard>

      <InfoCard title="Executive Function & ADHD" icon="🧩">
        <p className="mb-3">
          Executive functions are brain-based skills that help us manage daily life.
          People with ADHD often have differences in these areas:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300">Working Memory:</span> Holding info in mind
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300">Time Awareness:</span> Sensing time passing
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300">Task Initiation:</span> Getting started
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300">Organization:</span> Keeping things in order
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300">Emotional Regulation:</span> Managing feelings
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300">Flexibility:</span> Adapting to changes
          </div>
        </div>
      </InfoCard>

      <InfoCard title="ADHD & Sensory Connection" icon="🔗">
        <p className="mb-2">
          Many people with ADHD also have sensory processing differences:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Sensory overload can worsen focus difficulties</li>
          <li>Sensory seeking can look like "hyperactivity"</li>
          <li>Sound sensitivity can make it hard to filter background noise</li>
          <li>Proprioceptive input (movement, pressure) can help with focus</li>
          <li>Environmental adjustments can significantly improve function</li>
        </ul>
      </InfoCard>
    </div>
  );

  const renderStrategiesContent = () => (
    <div className="space-y-4">
      <InfoCard title="Sensory Strategies at Home" icon="🏠">
        <div className="space-y-3">
          <div className="p-3 bg-black/30 rounded">
            <h4 className="text-pink-400 font-bold mb-1">For Visual Sensitivity</h4>
            <ul className="text-sm list-disc list-inside">
              <li>Use dimmable lights or lamps instead of overhead lighting</li>
              <li>Reduce visual clutter in workspaces</li>
              <li>Try blue-light filtering glasses for screens</li>
              <li>Use solid colors instead of busy patterns</li>
            </ul>
          </div>
          <div className="p-3 bg-black/30 rounded">
            <h4 className="text-cyan-400 font-bold mb-1">For Sound Sensitivity</h4>
            <ul className="text-sm list-disc list-inside">
              <li>Noise-canceling headphones or ear defenders</li>
              <li>White noise machines to mask unpredictable sounds</li>
              <li>Create quiet spaces in the home</li>
              <li>Give advance warning before loud activities</li>
            </ul>
          </div>
          <div className="p-3 bg-black/30 rounded">
            <h4 className="text-yellow-400 font-bold mb-1">For Movement Needs</h4>
            <ul className="text-sm list-disc list-inside">
              <li>Wiggle seats or exercise balls for sitting</li>
              <li>Movement breaks every 20-30 minutes</li>
              <li>Fidget tools that don't distract</li>
              <li>Jumping, swinging, or heavy work activities</li>
            </ul>
          </div>
        </div>
      </InfoCard>

      <InfoCard title="Executive Function Supports" icon="📝">
        <div className="space-y-2">
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Visual schedules:</span>
            <span className="text-sm"> Pictures or written lists showing what comes next</span>
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Timers:</span>
            <span className="text-sm"> Visual timers help with time awareness and transitions</span>
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Body doubling:</span>
            <span className="text-sm"> Working alongside someone else for accountability</span>
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Chunking:</span>
            <span className="text-sm"> Breaking big tasks into smaller, manageable steps</span>
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Rewards:</span>
            <span className="text-sm"> Celebrate small wins to boost dopamine and motivation</span>
          </div>
        </div>
      </InfoCard>

      <InfoCard title="Calming Strategies" icon="🌊">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-purple-900/30 rounded border border-purple-400/30">
            <h4 className="text-purple-300 font-bold mb-1">Deep Pressure</h4>
            <p className="text-sm">Weighted blankets, tight hugs, compression clothing</p>
          </div>
          <div className="p-3 bg-blue-900/30 rounded border border-blue-400/30">
            <h4 className="text-blue-300 font-bold mb-1">Breathing</h4>
            <p className="text-sm">4-7-8 breathing, belly breathing, blowing bubbles</p>
          </div>
          <div className="p-3 bg-green-900/30 rounded border border-green-400/30">
            <h4 className="text-green-300 font-bold mb-1">Movement</h4>
            <p className="text-sm">Rocking, swinging, walking, stretching</p>
          </div>
          <div className="p-3 bg-pink-900/30 rounded border border-pink-400/30">
            <h4 className="text-pink-300 font-bold mb-1">Sensory Tools</h4>
            <p className="text-sm">Fidgets, stress balls, chewable jewelry</p>
          </div>
        </div>
      </InfoCard>

      <InfoCard title="Signs of Sensory Overload" icon="⚠️">
        <p className="mb-2 text-sm">
          Watch for these signs that someone might be overwhelmed:
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="p-2 bg-red-900/30 rounded">Covering ears or eyes</div>
          <div className="p-2 bg-red-900/30 rounded">Becoming very still/frozen</div>
          <div className="p-2 bg-red-900/30 rounded">Increased irritability</div>
          <div className="p-2 bg-red-900/30 rounded">Difficulty communicating</div>
          <div className="p-2 bg-red-900/30 rounded">Wanting to leave suddenly</div>
          <div className="p-2 bg-red-900/30 rounded">Physical complaints</div>
        </div>
        <p className="mt-3 text-sm text-yellow-300">
          When you notice these signs, offer a break in a quieter space and reduce demands.
        </p>
      </InfoCard>
    </div>
  );

  const renderResourcesContent = () => (
    <div className="space-y-4">
      <InfoCard title="For Families - Getting Started" icon="👨‍👩‍👧‍👦">
        <p className="mb-3">
          If you suspect your child or family member has sensory processing differences or ADHD,
          here are some first steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Keep a journal of behaviors, triggers, and what helps</li>
          <li>Talk to your pediatrician about your observations</li>
          <li>Request an evaluation from an occupational therapist (for sensory) or psychologist (for ADHD)</li>
          <li>Connect with other families for support and shared experiences</li>
          <li>Remember: every person is different, and strategies need to be individualized</li>
        </ol>
      </InfoCard>

      <InfoCard title="Professional Support" icon="👩‍⚕️">
        <div className="space-y-2">
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Occupational Therapist (OT):</span>
            <span className="text-sm"> Specializes in sensory processing, daily living skills</span>
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Psychologist/Psychiatrist:</span>
            <span className="text-sm"> Can diagnose ADHD and provide treatment options</span>
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Speech-Language Pathologist:</span>
            <span className="text-sm"> Helps with communication and social skills</span>
          </div>
          <div className="p-2 bg-black/30 rounded">
            <span className="text-yellow-300 font-bold">Behavioral Therapist:</span>
            <span className="text-sm"> Works on behavior strategies and coping skills</span>
          </div>
        </div>
      </InfoCard>

      <InfoCard title="Helpful Books" icon="📚">
        <ul className="space-y-2 text-sm">
          <li className="p-2 bg-black/30 rounded">
            <span className="text-pink-400">"The Out-of-Sync Child"</span> by Carol Kranowitz - Understanding SPD
          </li>
          <li className="p-2 bg-black/30 rounded">
            <span className="text-pink-400">"Driven to Distraction"</span> by Edward Hallowell - Understanding ADHD
          </li>
          <li className="p-2 bg-black/30 rounded">
            <span className="text-pink-400">"Raising a Sensory Smart Child"</span> by Lindsey Biel - Practical strategies
          </li>
          <li className="p-2 bg-black/30 rounded">
            <span className="text-pink-400">"Taking Charge of ADHD"</span> by Russell Barkley - Parent guide
          </li>
          <li className="p-2 bg-black/30 rounded">
            <span className="text-pink-400">"Interoception"</span> by Kelly Mahler - Understanding internal senses
          </li>
        </ul>
      </InfoCard>

      <InfoCard title="Remember" icon="💜">
        <div className="p-4 bg-purple-900/30 rounded border border-purple-400/30 text-center">
          <p className="text-lg mb-2">
            Sensory differences and ADHD are not deficits -
            they're different ways of experiencing the world.
          </p>
          <p className="text-sm text-cyan-200">
            With understanding, support, and the right strategies,
            every person can thrive in their own unique way.
          </p>
        </div>
      </InfoCard>

      <InfoCard title="This Game" icon="🎮">
        <p className="mb-2">
          <span className="text-yellow-300">Executive Function Hero</span> was created to:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Provide a low-pressure way to practice executive function skills</li>
          <li>Use gentle gamification that rewards all attempts, not just "success"</li>
          <li>Include sensory-friendly options and accessibility features</li>
          <li>Help families understand and support neurodivergent experiences</li>
          <li>Celebrate different ways of thinking and being</li>
        </ul>
      </InfoCard>
    </div>
  );

  return (
    <div className="min-h-screen w-full p-4 pt-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="neon-border neon-button px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <span>←</span>
            <span className="font-pixel text-xs">BACK</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-pixel text-pink-400">LEARN</h1>
          <div className="w-20"></div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-0">
          <TabButton
            label="Sensory"
            isActive={activeTab === 'sensory'}
            onClick={() => setActiveTab('sensory')}
          />
          <TabButton
            label="ADHD"
            isActive={activeTab === 'adhd'}
            onClick={() => setActiveTab('adhd')}
          />
          <TabButton
            label="Strategies"
            isActive={activeTab === 'strategies'}
            onClick={() => setActiveTab('strategies')}
          />
          <TabButton
            label="Resources"
            isActive={activeTab === 'resources'}
            onClick={() => setActiveTab('resources')}
          />
        </div>

        {/* Content Area */}
        <div className="ui-panel p-4 md:p-6 rounded-lg rounded-tl-none min-h-[60vh]">
          <div className="ui-corner top-right"></div>
          <div className="ui-corner bottom-left"></div>
          <div className="ui-corner bottom-right"></div>

          {activeTab === 'sensory' && renderSensoryContent()}
          {activeTab === 'adhd' && renderADHDContent()}
          {activeTab === 'strategies' && renderStrategiesContent()}
          {activeTab === 'resources' && renderResourcesContent()}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-cyan-400 opacity-60 text-sm">
          <p>Information provided for educational purposes only.</p>
          <p>Always consult healthcare professionals for personalized advice.</p>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
