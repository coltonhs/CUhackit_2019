using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MenuScript : MonoBehaviour
{
    public GameObject menu;
    public bool up = false;
    public bool down = false;
    public float moveDistance = 0;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (up == true)
        {
            Vector3 temp = new Vector3(0.0f, moveDistance, 0.0f);
            menu.transform.localPosition += temp;
            up = false;
        }
        if (down == true)
        {
            Vector3 temp = new Vector3(0.0f, moveDistance, 0.0f);
            menu.transform.localPosition -= temp;
            down = false;
        }
    }

    /*
    private IEnumerator MoveMenu()
    {

    }
    */
}
