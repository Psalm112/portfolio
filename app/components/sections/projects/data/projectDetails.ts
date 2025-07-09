export interface ProjectDetailType {
  id: string;
  overview: {
    challenge: string;
    solution: string;
    impact: string;
    duration: string;
    team: string;
    role: string;
  };
  caseStudy: {
    problemStatement: string;
    researchProcess: string[];
    designProcess: string[];
    technicalImplementation: string[];
    challengesAndSolutions: {
      challenge: string;
      solution: string;
      outcome: string;
    }[];
    results: {
      metric: string;
      before: string;
      after: string;
      improvement: string;
    }[];
  };
  technicalDetails: {
    architecture: string;
    codeSnippets: {
      title: string;
      language: string;
      code: string;
      description: string;
    }[];
    deploymentProcess: string[];
    performance: {
      loadTime: string;
      optimization: string;
      scalability: string;
    };
  };
  gallery: {
    images: string[];
    videos: string[];
    demos: string[];
  };
  testimonials?: {
    name: string;
    role: string;
    company: string;
    feedback: string;
    avatar: string;
  }[];
  nextSteps: string[];
  relatedProjects: string[];
}

export const projectDetails: Record<string, ProjectDetailType> = {
  "coffee-delivery-bot": {
    id: "coffee-delivery-bot",
    overview: {
      challenge:
        "Restaurant staff needed an autonomous solution to deliver coffee efficiently while maintaining customer service quality and ensuring spill-free transport.",
      solution:
        "Developed an intelligent mobile robot with advanced navigation, human-following capabilities, and smart load balancing for seamless coffee delivery operations.",
      impact:
        "Reduced delivery time by 60%, improved customer satisfaction by 40%, and eliminated human error in order delivery.",
      duration: "8 months",
      team: "4 Engineers",
      role: "Lead Hardware Engineer & Software Architect",
    },
    caseStudy: {
      problemStatement:
        "Traditional coffee delivery in restaurants relies heavily on human staff, leading to delays, potential spills, and inefficient resource allocation during peak hours. The challenge was to create an autonomous system that could navigate complex restaurant environments while maintaining the quality of service customers expect.",
      researchProcess: [
        "Conducted extensive field research in 15+ restaurants to understand delivery patterns",
        "Analyzed customer behavior and staff workflows during peak hours",
        "Studied existing autonomous delivery systems and their limitations",
        "Interviewed restaurant managers to identify key pain points",
        "Researched optimal sensor configurations for restaurant environments",
      ],
      designProcess: [
        "Created user journey maps for both customers and staff interactions",
        "Designed modular robot architecture for easy maintenance",
        "Developed fail-safe mechanisms for unexpected obstacles",
        "Prototyped multiple navigation algorithms for performance testing",
        "Implemented user-centered design principles for the mobile app interface",
      ],
      technicalImplementation: [
        "Implemented SLAM (Simultaneous Localization and Mapping) for real-time navigation",
        "Developed computer vision system for human detection and following",
        "Created predictive algorithms for optimal path planning",
        "Built robust communication system between robot and mobile app",
        "Implemented machine learning models for behavior prediction",
      ],
      challengesAndSolutions: [
        {
          challenge:
            "Navigating crowded restaurant spaces with unpredictable human movement",
          solution:
            "Implemented dynamic path planning with predictive modeling and sensor fusion",
          outcome:
            "Achieved 98.5% navigation accuracy even in crowded environments",
        },
        {
          challenge: "Preventing spills while maintaining delivery speed",
          solution:
            "Developed gyroscopic stabilization system with smart load balancing",
          outcome:
            "Reduced spill incidents by 99.2% while maintaining optimal delivery speed",
        },
        {
          challenge: "Real-time communication between robot and staff",
          solution:
            "Created low-latency mobile app with voice commands and visual feedback",
          outcome: "Achieved 250ms response time for all remote commands",
        },
      ],
      results: [
        {
          metric: "Delivery Time",
          before: "Average 5-7 minutes",
          after: "Average 2-3 minutes",
          improvement: "60% reduction",
        },
        {
          metric: "Customer Satisfaction",
          before: "75% satisfaction rate",
          after: "95% satisfaction rate",
          improvement: "40% increase",
        },
        {
          metric: "Staff Efficiency",
          before: "3 deliveries per staff/hour",
          after: "12 deliveries per robot/hour",
          improvement: "300% increase",
        },
      ],
    },
    technicalDetails: {
      architecture:
        "The system follows a distributed architecture with the robot as the central node, connected to a mobile app via Bluetooth, and integrated with the restaurant's POS system. The robot uses a modular design with separate processing units for navigation, communication, and load management.",
      codeSnippets: [
        {
          title: "Autonomous Navigation Controller",
          language: "cpp",
          code: `
// Main navigation control system
class NavigationController {
private:
    Sensors sensors;
    PathPlanner pathPlanner;
    ObstacleAvoidance obstacleAvoidance;
    
public:
    void updatePosition() {
        SensorData data = sensors.getAllSensorData();
        Position currentPos = localization.getCurrentPosition(data);
        
        if (obstacleAvoidance.isObstacleDetected(data)) {
            Path alternativePath = pathPlanner.generateAlternativePath(currentPos);
            executeMovement(alternativePath);
        } else {
            executeMovement(pathPlanner.getCurrentPath());
        }
    }
    
    void executeMovement(Path path) {
        MotorCommands commands = pathPlanner.generateMotorCommands(path);
        motorController.execute(commands);
        
        // Stabilization for load balancing
        if (loadSensor.isLoadUnbalanced()) {
            stabilizationSystem.adjust();
        }
    }
};
          `,
          description:
            "Core navigation system that handles real-time path planning and obstacle avoidance",
        },
        {
          title: "Human Following Algorithm",
          language: "cpp",
          code: `
// Human detection and following system
class HumanFollower {
private:
    ComputerVision cv;
    DistanceCalculator distanceCalc;
    
public:
    void followHuman() {
        std::vector<Person> detectedPersons = cv.detectHumans();
        
        if (!detectedPersons.empty()) {
            Person target = selectTargetPerson(detectedPersons);
            float distance = distanceCalc.calculateDistance(target);
            
            if (distance > FOLLOW_DISTANCE_MAX) {
                moveTowards(target.position);
            } else if (distance < FOLLOW_DISTANCE_MIN) {
                moveAway(target.position);
            }
            
            // Maintain optimal following distance
            maintainFollowingDistance(target);
        }
    }
    
    Person selectTargetPerson(std::vector<Person>& persons) {
        // Priority: Staff uniform > Closest person > Most consistent movement
        return prioritySelector.selectBestTarget(persons);
    }
};
          `,
          description:
            "Advanced human detection and following system with priority-based target selection",
        },
      ],
      deploymentProcess: [
        "Extensive testing in controlled laboratory environment",
        "Pilot deployment in partner restaurant for 2 weeks",
        "Iterative improvements based on real-world feedback",
        "Staff training and onboarding program",
        "Full deployment with continuous monitoring system",
      ],
      performance: {
        loadTime: "System boots in 30 seconds and becomes operational",
        optimization:
          "Real-time processing with 60fps computer vision and 1000Hz sensor fusion",
        scalability:
          "Designed to support up to 50 robots in a single restaurant network",
      },
    },
    gallery: {
      images: [
        "/projects/coffee-bot/gallery/robot-front.jpg",
        "/projects/coffee-bot/gallery/navigation-demo.jpg",
        "/projects/coffee-bot/gallery/app-interface.jpg",
        "/projects/coffee-bot/gallery/restaurant-deployment.jpg",
        "/projects/coffee-bot/gallery/technical-components.jpg",
      ],
      videos: [
        "/projects/coffee-bot/videos/navigation-demo.mp4",
        "/projects/coffee-bot/videos/human-following.mp4",
        "/projects/coffee-bot/videos/full-delivery-cycle.mp4",
      ],
      demos: [
        "https://coffee-bot-demo.vercel.app",
        "https://coffee-bot-simulation.vercel.app",
      ],
    },
    testimonials: [
      {
        name: "Maria Rodriguez",
        role: "Restaurant Manager",
        company: "Cafe Excellence",
        feedback:
          "The coffee delivery bot has revolutionized our service. Customers love the innovation and our staff can focus on more important tasks.",
        avatar: "/testimonials/maria-rodriguez.jpg",
      },
    ],
    nextSteps: [
      "Integration with voice ordering systems",
      "Advanced AI for predicting customer preferences",
      "Multi-robot coordination for larger establishments",
      "Integration with kitchen automation systems",
    ],
    relatedProjects: ["smart-home-security", "warehouse-management-gnn"],
  },
  // Add similar detailed entries for other projects...
};
